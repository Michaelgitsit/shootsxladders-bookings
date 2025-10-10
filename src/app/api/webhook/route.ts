import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { sql } from '@vercel/postgres';
import { Resend } from 'resend';
import { getConfirmationEmailHtml, getConfirmationEmailText } from '@/lib/email-template';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-09-30.clover',
});

const resend = new Resend(process.env.RESEND_API_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// Helper function to format date for email
function formatDateForEmail(dateString: string): string {
  const date = new Date(dateString + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'No signature provided' },
        { status: 400 }
      );
    }

    // Verify webhook signature
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      // Update booking status to confirmed and add customer details
      await sql`
        UPDATE bookings 
        SET 
          payment_status = 'confirmed',
          customer_email = ${session.customer_details?.email || null},
          customer_name = ${session.customer_details?.name || null}
        WHERE stripe_session_id = ${session.id}
      `;

      console.log(`Booking confirmed for session: ${session.id}`);

      // Get booking details for email
      const bookingResult = await sql`
        SELECT booking_date, booking_time, location, customer_email, customer_name
        FROM bookings
        WHERE stripe_session_id = ${session.id}
      `;

      if (bookingResult.rows.length > 0 && bookingResult.rows[0].customer_email) {
        const booking = bookingResult.rows[0];
        const formattedDate = formatDateForEmail(booking.booking_date);
        const customerName = booking.customer_name || '';
        
        try {
          // Send confirmation email
          await resend.emails.send({
            from: 'Shoots & Ladders <bookings@shootsxladders.com>',
            to: booking.customer_email,
            subject: 'Your Holiday Portrait Session is Confirmed! 📸',
            html: getConfirmationEmailHtml(
              customerName,
              formattedDate,
              booking.booking_time,
              booking.location
            ),
            text: getConfirmationEmailText(
              customerName,
              formattedDate,
              booking.booking_time,
              booking.location
            ),
          });

          console.log(`Confirmation email sent to ${booking.customer_email}`);
        } catch (emailError) {
          console.error('Failed to send confirmation email:', emailError);
          // Don't fail the webhook if email fails
        }

        // Send notification email to business owner
        try {
          await resend.emails.send({
            from: 'Shoots & Ladders <bookings@shootsxladders.com>',
            to: ['shootsandladders@gmail.com'],
            subject: `🎉 New Booking Confirmed - ${formattedDate} at ${booking.booking_time}`,
            html: `
              <h2>New Booking Confirmed! 🎉</h2>
              <p>A customer has successfully booked a photography session.</p>
              
              <h3>Customer Details:</h3>
              <p><strong>Name:</strong> ${booking.customer_name || 'Not provided'}</p>
              <p><strong>Email:</strong> ${booking.customer_email}</p>
              
              <h3>Session Details:</h3>
              <p><strong>Date:</strong> ${formattedDate}</p>
              <p><strong>Time:</strong> ${booking.booking_time}</p>
              <p><strong>Location:</strong> ${booking.location}</p>
              
              <p><strong>Payment Status:</strong> ✅ Confirmed</p>
              
              <hr>
              <p><small>This booking was automatically confirmed after successful payment processing.</small></p>
            `,
          });

          console.log(`Notification email sent to business owner`);
        } catch (notificationError) {
          console.error('Failed to send notification email:', notificationError);
          // Don't fail the webhook if notification fails
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Webhook error';
    console.error('Webhook error:', errorMessage);
    return NextResponse.json(
      { error: errorMessage },
      { status: 400 }
    );
  }
}

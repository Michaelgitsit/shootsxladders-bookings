import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { sql } from '@vercel/postgres';
import { Resend } from 'resend';
import { getConfirmationEmailHtml, getConfirmationEmailText } from '@/lib/email-template';

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
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const resend = new Resend(process.env.RESEND_API_KEY);
    
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
            to: ['shoots.ladders.photo@gmail.com'],
            subject: `🎉 New Booking Confirmed - ${formattedDate} at ${booking.booking_time}`,
            html: `
              <!DOCTYPE html>
              <html>
                <head>
                  <meta charset="utf-8">
                  <style>
                    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #2C2C2C; margin: 0; padding: 0; background-color: #FAFAF8; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #D4C5A9 0%, #C4B599 100%); padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0; }
                    .header-icon { font-size: 48px; margin-bottom: 10px; }
                    .title { margin: 0; color: #2C2C2C; font-size: 28px; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; }
                    .content { background: white; padding: 40px 30px; border-left: 1px solid #E5E3DC; border-right: 1px solid #E5E3DC; }
                    .section { margin-bottom: 30px; padding-bottom: 25px; border-bottom: 1px solid #F5F3ED; }
                    .section:last-child { border-bottom: none; margin-bottom: 0; }
                    .section-title { font-weight: 600; color: #2C2C2C; font-size: 14px; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 15px; }
                    .field { margin: 12px 0; display: flex; align-items: baseline; }
                    .field-label { font-weight: 600; color: #6B6B6B; font-size: 13px; min-width: 120px; }
                    .field-value { color: #2C2C2C; font-size: 16px; }
                    .status-badge { display: inline-block; background: #4CAF50; color: white; padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: 600; margin-top: 10px; }
                    .footer { background: #F5F3ED; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; font-size: 11px; color: #6B6B6B; border-top: 1px solid #E5E3DC; }
                  </style>
                </head>
                <body>
                  <div class="container">
                    <div class="header">
                      <div class="header-icon">🎉</div>
                      <h1 class="title">New Booking!</h1>
                    </div>
                    <div class="content">
                      <div class="section">
                        <div class="section-title">Customer Information</div>
                        <div class="field">
                          <span class="field-label">Name:</span>
                          <span class="field-value">${booking.customer_name || 'Not provided'}</span>
                        </div>
                        <div class="field">
                          <span class="field-label">Email:</span>
                          <span class="field-value"><a href="mailto:${booking.customer_email}" style="color: #D4C5A9; text-decoration: none;">${booking.customer_email}</a></span>
                        </div>
                      </div>
                      
                      <div class="section">
                        <div class="section-title">Session Details</div>
                        <div class="field">
                          <span class="field-label">Date:</span>
                          <span class="field-value">${formattedDate}</span>
                        </div>
                        <div class="field">
                          <span class="field-label">Time:</span>
                          <span class="field-value">${booking.booking_time}</span>
                        </div>
                        <div class="field">
                          <span class="field-label">Location:</span>
                          <span class="field-value">${booking.location}</span>
                        </div>
                      </div>
                      
                      <div class="section">
                        <div class="section-title">Payment Status</div>
                        <span class="status-badge">✅ Payment Confirmed</span>
                        <p style="margin-top: 15px; color: #6B6B6B; font-size: 14px;">Customer has paid the $20 deposit. Confirmation email has been sent automatically.</p>
                      </div>
                    </div>
                    <div class="footer">
                      <p style="margin: 0; font-weight: 500;">Shoots & Ladders</p>
                      <p style="margin: 5px 0 0 0;">Automated booking notification</p>
                    </div>
                  </div>
                </body>
              </html>
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

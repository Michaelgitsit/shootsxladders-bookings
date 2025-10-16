import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { sql } from '@vercel/postgres';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { date, time, location } = await req.json();

    // Check if the slot is already booked
    const existing = await sql`
      SELECT id FROM bookings 
      WHERE booking_date = ${date} 
      AND booking_time = ${time}
      AND payment_status = 'confirmed'
    `;

    if (existing.rows.length > 0) {
      return NextResponse.json(
        { error: 'This time slot has already been booked' },
        { status: 400 }
      );
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID!,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}?canceled=true`,
      metadata: {
        date,
        time,
        location,
      },
    });

    // Save booking with pending status
    await sql`
      INSERT INTO bookings (booking_date, booking_time, location, stripe_session_id, payment_status)
      VALUES (${date}, ${time}, ${location}, ${session.id}, 'pending')
      ON CONFLICT (booking_date, booking_time) 
      DO UPDATE SET 
        stripe_session_id = ${session.id},
        payment_status = 'pending',
        created_at = CURRENT_TIMESTAMP
    `;

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'An error occurred';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

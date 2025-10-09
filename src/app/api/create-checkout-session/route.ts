import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-09-30.clover',
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { date, time, location, customerName, customerEmail, customerPhone } = body;

    // Validate required fields
    if (!date || !time || !location) {
      return NextResponse.json(
        { error: 'Missing required booking information' },
        { status: 400 }
      );
    }

    // Get the protocol and host for the success/cancel URLs
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
    const host = request.headers.get('host') || 'buy.shootsxladders.com';
    const baseUrl = `${protocol}://${host}`;

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}?canceled=true`,
      metadata: {
        date,
        time,
        location,
        customerName: customerName || '',
        customerEmail: customerEmail || '',
        customerPhone: customerPhone || '',
      },
      customer_email: customerEmail || undefined,
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error: unknown) {
    console.error('Error creating checkout session:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}


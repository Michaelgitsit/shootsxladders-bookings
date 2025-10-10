import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch all bookings ordered by most recent first
    const result = await sql`
      SELECT 
        id,
        booking_date,
        booking_time,
        location,
        customer_email,
        customer_name,
        payment_status,
        created_at
      FROM bookings 
      ORDER BY created_at DESC
    `;

    return NextResponse.json({ 
      bookings: result.rows,
      success: true 
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to fetch bookings', details: errorMessage },
      { status: 500 }
    );
  }
}

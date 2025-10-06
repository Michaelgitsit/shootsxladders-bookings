import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch all booked slots with confirmed payments
    const result = await sql`
      SELECT booking_date, booking_time 
      FROM bookings 
      WHERE payment_status = 'confirmed'
    `;

    // Return the booked slots
    const bookedSlots = result.rows.map(row => ({
      date: row.booking_date,
      time: row.booking_time,
    }));

    return NextResponse.json({ 
      bookedSlots,
      success: true 
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to fetch available slots', details: errorMessage },
      { status: 500 }
    );
  }
}

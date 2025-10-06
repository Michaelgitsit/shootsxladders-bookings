import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Create bookings table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        booking_date DATE NOT NULL,
        booking_time VARCHAR(20) NOT NULL,
        location TEXT NOT NULL,
        customer_email VARCHAR(255),
        customer_name VARCHAR(255),
        stripe_session_id VARCHAR(255) UNIQUE,
        payment_status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(booking_date, booking_time)
      );
    `;

    // Create index for faster queries
    await sql`
      CREATE INDEX IF NOT EXISTS idx_bookings_date_time 
      ON bookings(booking_date, booking_time);
    `;

    return NextResponse.json({ 
      message: 'Database initialized successfully',
      success: true 
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to initialize database', details: errorMessage },
      { status: 500 }
    );
  }
}

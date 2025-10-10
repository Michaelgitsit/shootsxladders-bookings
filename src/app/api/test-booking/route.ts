import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Add a test booking
    await sql`
      INSERT INTO bookings (booking_date, booking_time, location, customer_email, customer_name, payment_status)
      VALUES ('2025-11-08', '9:00 AM', '118 E 8th St, Georgetown, TX 78626', 'test@example.com', 'Test Customer', 'confirmed')
      ON CONFLICT (booking_date, booking_time) 
      DO UPDATE SET payment_status = 'confirmed'
    `;
    
    return NextResponse.json({ 
      message: 'Test booking added successfully',
      success: true 
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to add test booking', details: errorMessage },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    // Remove test booking
    await sql`
      DELETE FROM bookings 
      WHERE booking_date = '2025-11-08' 
      AND booking_time = '9:00 AM'
    `;
    
    return NextResponse.json({ 
      message: 'Test booking removed successfully',
      success: true 
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to remove test booking', details: errorMessage },
      { status: 500 }
    );
  }
}

import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Add company field to bookings table if it doesn't exist
    await sql`
      ALTER TABLE bookings 
      ADD COLUMN IF NOT EXISTS company VARCHAR(255);
    `;

    return NextResponse.json({ 
      message: 'Company field added successfully',
      success: true 
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to add company field', details: errorMessage },
      { status: 500 }
    );
  }
}

// Test script to verify booking system
const { sql } = require('@vercel/postgres');

async function testBooking() {
  try {
    // Add a test booking
    await sql`
      INSERT INTO bookings (booking_date, booking_time, location, customer_email, customer_name, payment_status)
      VALUES ('2025-11-08', '9:00 AM', '118 E 8th St, Georgetown, TX 78626', 'test@example.com', 'Test Customer', 'confirmed')
      ON CONFLICT (booking_date, booking_time) 
      DO UPDATE SET payment_status = 'confirmed'
    `;
    
    console.log('Test booking added successfully');
    
    // Check available slots
    const result = await sql`
      SELECT booking_date, booking_time 
      FROM bookings 
      WHERE payment_status = 'confirmed'
    `;
    
    console.log('Confirmed bookings:', result.rows);
    
  } catch (error) {
    console.error('Error:', error);
  }
}

testBooking();

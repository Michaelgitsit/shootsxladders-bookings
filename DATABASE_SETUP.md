# Database & Booking System Setup Guide

This guide will help you set up the booking system with real-time availability tracking.

## 📋 Overview

Your booking system now includes:
- **Database** to store bookings
- **Real-time availability** - shows which slots are taken
- **Stripe webhook** to confirm bookings on payment
- **Customer data** storage (email, name)

## 🚀 Setup Steps

### 1. Set Up Vercel Postgres Database

1. Go to your Vercel project dashboard
2. Navigate to the **Storage** tab
3. Click **Create Database**
4. Select **Postgres**
5. Choose a name (e.g., `shootsxladders-bookings-db`)
6. Click **Create**

Vercel will automatically add the `POSTGRES_URL` and related environment variables to your project.

### 2. Initialize the Database

After the Postgres database is created and deployed:

1. Visit: `https://buy.shootsxladders.com/api/init-db`
2. You should see: `{"message":"Database initialized successfully","success":true}`

This creates the `bookings` table with the following fields:
- `id` - Unique booking ID
- `booking_date` - Date of the session (YYYY-MM-DD)
- `booking_time` - Time slot (e.g., "9:00 AM")
- `location` - Session location
- `customer_email` - Customer's email (from Stripe)
- `customer_name` - Customer's name (from Stripe)
- `stripe_session_id` - Stripe checkout session ID
- `payment_status` - 'pending' or 'confirmed'
- `created_at` - Timestamp

### 3. Set Up Stripe Webhook

The webhook ensures bookings are confirmed only after successful payment.

#### Get Your Webhook Secret:

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/webhooks)
2. Click **Add endpoint**
3. Enter the endpoint URL:
   ```
   https://buy.shootsxladders.com/api/webhook
   ```
4. Select events to listen for:
   - `checkout.session.completed`
5. Click **Add endpoint**
6. Copy the **Signing secret** (starts with `whsec_...`)

#### Add to Vercel:

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add a new variable:
   - **Name**: `STRIPE_WEBHOOK_SECRET`
   - **Value**: Your webhook signing secret (whsec_...)
4. Click **Save**
5. **Redeploy** your application for the changes to take effect

### 4. Update Local Environment (Optional for local testing)

If you want to test locally, update your `.env.local`:

```bash
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

For local webhook testing, use [Stripe CLI](https://stripe.com/docs/stripe-cli):
```bash
stripe listen --forward-to localhost:3000/api/webhook
```

## ✅ How It Works

### Booking Flow:

1. **User selects date and time** → Frontend fetches real-time availability
2. **User clicks "Book Now"** → System checks if slot is available
3. **Checkout session created** → Booking saved with `payment_status: 'pending'`
4. **User pays on Stripe** → Stripe sends webhook to your app
5. **Webhook confirms** → Booking updated to `payment_status: 'confirmed'`
6. **Slot now unavailable** → Other users can't book that time

### Data Flow:

```
User clicks date → API checks available-slots → Shows real-time availability
                                ↓
User selects time → Booking saved as 'pending' → Redirect to Stripe
                                ↓
Payment succeeds → Webhook triggered → Booking confirmed
                                ↓
Slot marked unavailable → Shows in real-time to all users
```

## 🔍 Testing

### Check Available Slots:
Visit: `https://buy.shootsxladders.com/api/available-slots`

Returns:
```json
{
  "bookedSlots": [
    { "date": "2025-11-08", "time": "9:00 AM" },
    { "date": "2025-11-15", "time": "2:30 PM" }
  ],
  "success": true
}
```

### Make a Test Booking:

1. Go to your booking page
2. Select a date and time
3. Use Stripe test card: `4242 4242 4242 4242`
4. Complete the payment
5. Check the API again - that slot should now be unavailable

## 🔧 Troubleshooting

### Slots not updating?
- Ensure database is initialized (`/api/init-db`)
- Check Vercel logs for errors
- Verify `POSTGRES_URL` is set in Vercel environment variables

### Webhooks not working?
- Verify `STRIPE_WEBHOOK_SECRET` is set correctly in Vercel
- Check Stripe Dashboard → Webhooks → Events for errors
- Ensure endpoint URL is correct: `https://buy.shootsxladders.com/api/webhook`

### Database connection errors?
- Confirm Postgres database is created in Vercel Storage tab
- Ensure your project is redeployed after adding database
- Check Vercel deployment logs

## 📊 Viewing Bookings

You can query your database directly in Vercel:

1. Go to Vercel → Storage → Your Postgres database
2. Click **Query** tab
3. Run:
```sql
SELECT * FROM bookings ORDER BY created_at DESC;
```

## 🎉 Done!

Your booking system is now live with:
- ✅ Real-time availability tracking
- ✅ Stripe payment integration
- ✅ Customer data storage
- ✅ Automatic slot management

All time slots will now show as unavailable once they're booked and paid for!

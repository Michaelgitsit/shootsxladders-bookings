# 🧪 Complete Booking Flow Test Guide

## Overview
This guide walks you through testing the complete booking flow to verify:
1. ✅ Time slot gets crossed out after payment
2. ✅ Customer receives confirmation email
3. ✅ Business owner receives notification email
4. ✅ Admin dashboard gets populated and sorted

---

## 🚀 Quick Test (5 minutes)

### Step 1: Access the Booking Site
1. Go to: **https://buy.shootsxladders.com**
2. You should see the booking calendar

### Step 2: Select a Time Slot
1. Choose a date (scroll if needed)
2. Click on an **available time slot** (not crossed out)
3. Select a location from the dropdown
4. Click "Continue to Payment"

### Step 3: Complete Test Payment
Use Stripe's test card numbers:
- **Card Number:** `4242 4242 4242 4242`
- **Expiration:** Any future date (e.g., `12/25`)
- **CVC:** Any 3 digits (e.g., `123`)
- **ZIP:** Any 5 digits (e.g., `12345`)
- **Email:** Use a real email you can check (e.g., `youremail@gmail.com`)

Click "Pay" to complete the test payment.

### Step 4: Verify Success
After payment, you should be redirected to a success page.

---

## ✅ Verification Checklist

### 1️⃣ Time Slot Availability (Frontend)
- [ ] Go back to **https://buy.shootsxladders.com**
- [ ] Find the date and time you just booked
- [ ] **Verify:** The slot should now be **crossed out/unavailable**
- [ ] **Verify:** Other customers cannot select this slot

**How it works:**
- Frontend calls `/api/available-slots` on page load
- This API returns all confirmed bookings
- Slots with `payment_status = 'confirmed'` are marked unavailable

---

### 2️⃣ Customer Confirmation Email
- [ ] Check the email inbox you used during checkout
- [ ] Look for an email from **"Shoots & Ladders <bookings@shootsxladders.com>"**
- [ ] Subject: "Booking Confirmed - [Your Date]"

**Email should contain:**
- ✅ Customer name and email
- ✅ Booking date and time
- ✅ Location details
- ✅ Payment confirmation

**If email not received:**
- Check spam/junk folder
- Verify Resend dashboard: https://resend.com/emails
- Check Vercel environment variables: `RESEND_API_KEY`

---

### 3️⃣ Business Owner Notification Email
- [ ] Check **shootsandladders@gmail.com** inbox
- [ ] Look for an email from **"Shoots & Ladders <bookings@shootsxladders.com>"**
- [ ] Subject: "🎉 New Booking Confirmed - [Date] at [Time]"

**Email should contain:**
- ✅ Customer name
- ✅ Customer email
- ✅ Booking date and time
- ✅ Location
- ✅ Payment status (Confirmed)

**Preview the email format:**
Visit: **https://buy.shootsxladders.com/email-preview**

---

### 4️⃣ Admin Dashboard Population
- [ ] Go to: **https://buy.shootsxladders.com/admin**
- [ ] Find your test booking in the list
- [ ] **Verify booking shows:**
  - ✅ Correct date and time
  - ✅ Customer email and name
  - ✅ Location
  - ✅ Status: "Confirmed" (green badge)
  - ✅ Timestamp of when booking was made

**Verify Sorting:**
- [ ] Bookings are sorted by most recent first (newest at top)
- [ ] Each booking card is clearly formatted

---

### 5️⃣ CSV Export (Spreadsheet)
- [ ] On the admin dashboard: **https://buy.shootsxladders.com/admin**
- [ ] Scroll to "Export by Date" section
- [ ] Find the date of your test booking
- [ ] Click the **"📥 Export CSV"** button for that date

**Verify CSV contains:**
- ✅ Date column
- ✅ Time column (sorted chronologically)
- ✅ Customer Name
- ✅ Email
- ✅ Company (if provided)
- ✅ Location
- ✅ Status (Confirmed)
- ✅ Booked On timestamp

**You can also:**
- [ ] Click **"📊 Export All"** to download all bookings
- [ ] Open CSV in Excel/Google Sheets
- [ ] Verify data is properly formatted

---

## 🔍 Debugging Common Issues

### Issue: Time slot NOT crossed out
**Possible causes:**
1. Webhook didn't fire (check Vercel logs)
2. `payment_status` still "pending" instead of "confirmed"
3. Database not updated

**How to check:**
```bash
# Check Vercel deployment logs
vercel logs --follow

# Or check Stripe webhook events in Stripe Dashboard
# https://dashboard.stripe.com/test/webhooks
```

**Fix:**
- Verify `STRIPE_WEBHOOK_SECRET` is set in Vercel
- Check webhook endpoint is configured in Stripe Dashboard
- Endpoint URL: `https://buy.shootsxladders.com/api/webhook`

---

### Issue: Emails not sending
**Possible causes:**
1. `RESEND_API_KEY` not set or invalid
2. Webhook didn't complete successfully
3. Email domain not verified in Resend

**How to check:**
- Visit Resend dashboard: https://resend.com/emails
- Look for email logs
- Check "from" address domain is verified

**Fix:**
- Verify environment variable in Vercel: `RESEND_API_KEY`
- Check Vercel logs for email sending errors
- Verify domain in Resend settings

---

### Issue: Admin dashboard empty
**Possible causes:**
1. API route failing
2. Database connection issue
3. Postgres environment variables not set

**How to check:**
```bash
# Check if API returns data
curl https://buy.shootsxladders.com/api/admin/bookings
```

**Fix:**
- Verify Vercel Postgres is connected
- Check Vercel logs for database errors
- Ensure database table exists (run `/api/init-db`)

---

## 🎯 Expected End-to-End Flow

```
1. Customer visits buy.shootsxladders.com
   ↓
2. Selects available time slot + location
   ↓
3. Clicks "Continue to Payment"
   ↓
4. API: /api/create-checkout-session
   - Creates Stripe checkout
   - Saves booking with status: "pending"
   - Returns checkout URL
   ↓
5. Customer enters card details (4242...)
   ↓
6. Stripe processes payment
   ↓
7. Stripe sends webhook to /api/webhook
   - Updates booking status: "confirmed"
   - Captures customer email and name
   - Sends customer confirmation email
   - Sends business owner notification email
   ↓
8. Customer redirected to success page
   ↓
9. Time slot becomes unavailable (crossed out)
   ↓
10. Both emails delivered
    ↓
11. Admin dashboard shows confirmed booking
    ↓
12. CSV export available with sorted data
```

---

## 📧 Email Preview Examples

### Customer Confirmation Email
```
Subject: Booking Confirmed - December 20, 2024

Hi [Customer Name],

Your photography session has been confirmed! ✅

📅 Session Details:
Date: December 20, 2024
Time: 2:00 PM - 3:00 PM
Location: Downtown Studio

We look forward to working with you!

Best regards,
Shoots and Ladders Team
```

### Business Owner Notification
```
Subject: 🎉 New Booking Confirmed - December 20, 2024 at 2:00 PM - 3:00 PM

New Booking Confirmed! 🎉
A customer has successfully booked a photography session.

👤 Customer Details:
Name: Test Customer
Email: test@example.com

📅 Session Details:
Date: December 20, 2024
Time: 2:00 PM - 3:00 PM
Location: Downtown Studio

Payment Status: ✅ Confirmed
```

---

## 🎉 Success Criteria

All tests pass if:
- ✅ Slot becomes unavailable immediately after payment
- ✅ Customer receives confirmation email within 1 minute
- ✅ Business owner receives notification email within 1 minute
- ✅ Admin dashboard shows booking with status "Confirmed"
- ✅ CSV export includes the booking, sorted by time
- ✅ Booking data is accurate (date, time, location, customer info)

---

## 🆘 Need Help?

If any test fails:
1. Check Vercel deployment logs
2. Check Stripe webhook logs in Stripe Dashboard
3. Check Resend email logs in Resend Dashboard
4. Verify all environment variables are set correctly
5. Test the API endpoints directly using the test script

Run automated tests:
```bash
cd /Users/michaelrodgers/Desktop/shootsxladderslanding
node test-booking-flow.js
```

---

## 📊 Monitoring Production

### Regular Checks:
- Monitor Resend for email delivery rates
- Check Stripe Dashboard for successful payments
- Review admin dashboard daily for new bookings
- Export CSV weekly for record-keeping

### URLs to Bookmark:
- Booking Site: https://buy.shootsxladders.com
- Admin Dashboard: https://buy.shootsxladders.com/admin
- Email Preview: https://buy.shootsxladders.com/email-preview
- Stripe Dashboard: https://dashboard.stripe.com
- Resend Dashboard: https://resend.com
- Vercel Dashboard: https://vercel.com

---

**Ready to test? Start at Step 1! 🚀**


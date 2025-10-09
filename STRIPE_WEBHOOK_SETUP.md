# Stripe Webhook Secret Setup

## Missing Environment Variable

Your site needs one more environment variable to complete the Stripe integration:

**`STRIPE_WEBHOOK_SECRET`**

This is required for the webhook endpoint at `/api/webhook` to verify that payment confirmation requests are actually coming from Stripe.

## How to Get Your Webhook Secret

### 1. Go to Stripe Dashboard
Visit: https://dashboard.stripe.com/webhooks

### 2. Create or Select a Webhook
- If you already have a webhook configured for `buy.shootsxladders.com`, click on it
- If not, click "Add endpoint" and enter: `https://buy.shootsxladders.com/api/webhook`

### 3. Select Events to Listen For
Make sure to select:
- `checkout.session.completed` (this confirms when payment is successful)

### 4. Get Your Signing Secret
- Once created/selected, you'll see "Signing secret"
- Click "Reveal" to see the secret (starts with `whsec_`)
- Copy this value

### 5. Add to Vercel
```bash
# Option 1: Using Vercel CLI
cd /Users/michaelrodgers/Desktop/shootsxladderslanding
vercel env add STRIPE_WEBHOOK_SECRET

# When prompted:
# - Paste the webhook secret
# - Select all environments (Production, Preview, Development)

# Option 2: Using Vercel Dashboard
# 1. Go to https://vercel.com/dashboard
# 2. Select your shootsxladders-bookings project
# 3. Go to Settings → Environment Variables
# 4. Click "Add New"
# 5. Name: STRIPE_WEBHOOK_SECRET
# 6. Value: whsec_your_secret_here
# 7. Select all environments
# 8. Click "Save"
```

### 6. Redeploy
After adding the variable, trigger a new deployment:
```bash
vercel --prod
```

Or push any change to GitHub to trigger automatic deployment.

## Why This Is Important

Without the webhook secret:
- Payments will still work
- Users will see the success page
- BUT the booking won't be marked as confirmed in the database
- AND confirmation emails won't be sent

With the webhook secret:
- ✅ Payment confirmed
- ✅ Booking status updated to "confirmed"
- ✅ Confirmation email sent to customer
- ✅ Time slot marked as unavailable

## Testing Your Webhook

After setting up:

1. Use Stripe test mode and test cards
2. Try booking a session with card: `4242 4242 4242 4242`
3. Check Stripe dashboard webhooks section to see if events are being received
4. Check your database to confirm the booking status changed to "confirmed"

## Quick Command to Add It

```bash
cd /Users/michaelrodgers/Desktop/shootsxladderslanding
vercel env add STRIPE_WEBHOOK_SECRET production
```

Then paste your `whsec_...` secret when prompted.


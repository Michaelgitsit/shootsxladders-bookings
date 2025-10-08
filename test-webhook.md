# Webhook Troubleshooting Guide

## Your Webhook URL Should Be:
```
https://buy.shootsxladders.com/api/webhook
```

## Check These in Order:

### 1. Stripe Webhook Configuration
- [ ] Go to Stripe Dashboard → Developers → Webhooks
- [ ] Find your webhook endpoint
- [ ] Verify the URL is: `https://buy.shootsxladders.com/api/webhook`
- [ ] Click on it and scroll to "Events to send"
- [ ] **Make sure `checkout.session.completed` is selected**

### 2. Test the Webhook in Stripe
- [ ] In your webhook details, click "Send test webhook"
- [ ] Select event: `checkout.session.completed`
- [ ] Click "Send test webhook"
- [ ] Check if it succeeds (you should see a ✅ or ❌)

### 3. Check Recent Webhook Deliveries
- [ ] In webhook details, scroll to "Recent deliveries"
- [ ] Look for your test booking attempt
- [ ] Click on it to see:
  - Response code (should be 200)
  - Any error messages
  - Request/response details

### 4. Vercel Environment Variables
Go to Vercel → Your Project → Settings → Environment Variables

Must have:
- [ ] `RESEND_API_KEY` (from resend.com)
- [ ] `STRIPE_WEBHOOK_SECRET` (from Stripe webhook details)
- [ ] `STRIPE_SECRET_KEY` (from Stripe API keys)

### 5. Test Email Sending
After a successful payment, check:
- [ ] Stripe webhook shows 200 response
- [ ] No error in webhook delivery details
- [ ] Check spam folder for confirmation email
- [ ] Check Resend dashboard for sent emails

## Common Issues:

### Issue 1: No webhook events firing
**Solution:** Make sure `checkout.session.completed` event is selected in Stripe

### Issue 2: Webhook returns 400 error
**Solution:** Check that `STRIPE_WEBHOOK_SECRET` is correct in Vercel

### Issue 3: Webhook succeeds but no email
**Solution:** 
- Check `RESEND_API_KEY` is set in Vercel
- Verify email domain is verified in Resend
- Check Resend logs for delivery issues

### Issue 4: Email goes to spam
**Solution:** 
- Verify domain in Resend (add DNS records)
- Ask recipient to check spam folder

## Need More Help?

Check Vercel logs:
```
vercel logs [your-deployment-url] --follow
```

Or view in Vercel Dashboard:
Deployments → [Latest] → Functions → /api/webhook

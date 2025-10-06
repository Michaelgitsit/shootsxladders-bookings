# Email Setup Instructions

Your booking system now sends beautiful confirmation emails automatically! Here's how to set it up:

## 1. Create a Resend Account

1. Go to [resend.com](https://resend.com)
2. Sign up for a free account (100 emails/day free)
3. Verify your email address

## 2. Add Your Domain

1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Add `shootsxladders.com`
4. Follow the DNS verification steps:
   - Add the provided DNS records to your domain (same place you set up the CNAME for buy.shootsxladders.com)
   - This allows emails to come from `bookings@shootsxladders.com`

**Note:** While waiting for domain verification, you can use Resend's test domain to send test emails to your own email.

## 3. Get Your API Key

1. In Resend dashboard, go to **API Keys**
2. Click **Create API Key**
3. Give it a name like "Production"
4. Copy the API key (starts with `re_`)

## 4. Add API Key to Vercel

1. Go to your Vercel project: [vercel.com/dashboard](https://vercel.com)
2. Select your `shootsxladders-bookings` project
3. Go to **Settings** → **Environment Variables**
4. Add a new variable:
   - **Key:** `RESEND_API_KEY`
   - **Value:** Paste your Resend API key (the one starting with `re_`)
   - **Environments:** Check all three (Production, Preview, Development)
5. Click **Save**

## 5. Redeploy

After adding the environment variable:
1. Go to your project's **Deployments** tab
2. Click the three dots on the latest deployment
3. Click **Redeploy**
4. Or just push a new commit to GitHub (it will auto-deploy)

## 6. Test It!

Make a test booking at [buy.shootsxladders.com](https://buy.shootsxladders.com) and you should receive:

✅ A beautiful confirmation email with:
- Booking date, time, and location
- What to expect during the session
- Preparation tips
- Important reminders

## Email Features

The confirmation emails include:
- **Luxury design** matching your brand aesthetic
- **Mobile responsive** - looks great on any device
- **Professional layout** with your branding
- **Helpful information** for customers
- **Plain text fallback** for email clients that don't support HTML

## Local Development (Optional)

If you want to test emails locally:
1. Add the `RESEND_API_KEY` to your local `.env.local` file
2. Run `npm run dev`
3. Use a tool like [ngrok](https://ngrok.com) to expose your local webhook endpoint
4. Update your Stripe webhook URL temporarily to the ngrok URL

## Need Help?

- **Resend Documentation:** [resend.com/docs](https://resend.com/docs)
- **Resend Support:** support@resend.com
- **Email not sending?** Check Vercel deployment logs for error messages

## Important Notes

- Emails will only send **after successful payment** via Stripe webhook
- Make sure your Stripe webhook is properly configured (see `DATABASE_SETUP.md`)
- Free tier includes 100 emails/day (more than enough for most businesses)
- Upgrade to paid plan if you need more volume

---

**Your emails will be sent from:** `Shoots & Ladders <bookings@shootsxladders.com>`

This creates a professional experience for your customers! 📧✨

# Deployment Guide - Holiday Portrait Booking System

## 🚀 Quick Deploy to Vercel

### Step 1: Deploy to Vercel

1. **Login to Vercel** (in your terminal or browser):
   ```bash
   npx vercel login
   ```
   - Choose "Continue with GitHub" or your preferred method
   - Follow the authentication steps in your browser

2. **Deploy the site**:
   ```bash
   npx vercel
   ```
   - Answer the prompts:
     - Set up and deploy? **Yes**
     - Which scope? Choose your account
     - Link to existing project? **No**
     - What's your project's name? **holiday-portraits** (or your choice)
     - In which directory is your code? **./** (just press Enter)
     - Want to override settings? **No** (just press Enter)

3. **Deploy to Production**:
   ```bash
   npx vercel --prod
   ```

### Step 2: Add Environment Variables to Vercel

After deployment, you need to add your Stripe keys:

**Option A: Via Vercel Dashboard** (Easiest)
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click on your project
3. Go to **Settings** → **Environment Variables**
4. Add these three variables (use your actual keys from your local `.env.local` file):
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here
   
   STRIPE_SECRET_KEY=your_stripe_secret_key_here
   
   STRIPE_PRICE_ID=your_stripe_price_id_here
   ```
5. Click **Save**
6. Go to **Deployments** and click **Redeploy** on the latest deployment

**Note:** Your actual keys are stored safely in your local `.env.local` file (which is not pushed to GitHub).

**Option B: Via CLI**
```bash
npx vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
# Paste your publishable key when prompted

npx vercel env add STRIPE_SECRET_KEY
# Paste your secret key when prompted

npx vercel env add STRIPE_PRICE_ID
# Paste your price ID when prompted
```

Then redeploy:
```bash
npx vercel --prod
```

---

## 🌐 Connect Your Custom Domain: shootsxladders.com

### Option 1: Subdomain (RECOMMENDED) - buy.shootsxladders.com

**In Vercel Dashboard:**
1. Go to your project → **Settings** → **Domains**
2. Click **Add Domain**
3. Enter: `buy.shootsxladders.com`
4. Vercel will give you DNS instructions

**In Your Domain Provider (GoDaddy, Namecheap, etc.):**
1. Log into your domain registrar
2. Go to DNS settings for `shootsxladders.com`
3. Add a **CNAME record**:
   - **Type**: CNAME
   - **Name**: `buy`
   - **Value**: `cname.vercel-dns.com`
   - **TTL**: 3600 (or default)
4. Save and wait 5-60 minutes for DNS to propagate

✅ Your booking page will be at: **buy.shootsxladders.com**

---

### Option 2: Subdirectory - shootsxladders.com/booking

This requires configuring redirects/rewrites on your main website to point `/booking` to your Vercel deployment.

**If your main site uses Vercel:**
Add to your main site's `vercel.json`:
```json
{
  "rewrites": [
    {
      "source": "/booking/:path*",
      "destination": "https://[your-vercel-url].vercel.app/:path*"
    }
  ]
}
```

**If your main site is elsewhere:**
Configure your web server (Apache/Nginx) to proxy `/booking` requests to your Vercel URL.

---

### Option 3: Use Main Domain

⚠️ This will replace your current website!

**In Vercel Dashboard:**
1. Go to your project → **Settings** → **Domains**
2. Add: `shootsxladders.com` and `www.shootsxladders.com`
3. Update your domain's DNS:
   - **A Record** for `@` (root): Point to Vercel's IP (shown in dashboard)
   - **CNAME** for `www`: Point to `cname.vercel-dns.com`

---

## 📧 Update Stripe Success/Cancel URLs

After you have your live domain, update your Stripe API call if needed. Currently it uses:
- Success: `https://yourdomain.com/success?session_id={CHECKOUT_SESSION_ID}`
- Cancel: `https://yourdomain.com?canceled=true`

These will automatically work with your custom domain once configured!

---

## 🎉 You're Live!

Your booking system is now live and accepting real payments through Stripe!

### Test Your Live Site:
1. Visit your domain
2. Select a date and time
3. Click "Book Now & Pay $20 Deposit"
4. Complete a test payment with a real card
5. Check your Stripe dashboard for the payment

### Monitor Bookings:
- Go to [Stripe Dashboard](https://dashboard.stripe.com)
- View all payments under "Payments"
- Each payment includes metadata with date, time, and location

---

## 🔧 Troubleshooting

**"Module not found" errors?**
- Make sure you ran `npm install` before deploying
- Vercel should install dependencies automatically

**Stripe errors?**
- Double-check your environment variables in Vercel
- Make sure you're using LIVE keys (pk_live_, sk_live_) with a LIVE price ID

**Custom domain not working?**
- DNS can take up to 24 hours (usually 5-60 minutes)
- Check DNS propagation at: https://dnschecker.org
- Make sure you added the CNAME record correctly

**Need to make changes?**
- Edit your code locally
- Commit: `git add . && git commit -m "Update message"`
- Deploy: `npx vercel --prod`

---

## 📱 Share Your Booking Link

Once live, share your booking page:
- **Website**: Add a button on shootsxladders.com that links to buy.shootsxladders.com
- **Social Media**: Share the direct link: buy.shootsxladders.com
- **Email**: Include in your email signature
- **QR Code**: Generate a QR code for printed materials

---

Need help? The site is ready to go live! 🚀

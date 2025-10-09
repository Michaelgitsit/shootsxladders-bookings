# Deployment Checklist - Buy.ShootsXLadders.com

## ✅ Code Fixes Completed

- [x] Fixed image paths (moved to `/public/images/`)
- [x] Created `/api/contact` route for contact form
- [x] Created `/api/create-checkout-session` route for Stripe payments
- [x] Created success page with proper Suspense boundaries
- [x] Fixed all build errors
- [x] Build passes successfully

## 📋 Pre-Deployment Requirements

### 1. Environment Variables

You need to set up these environment variables in Vercel:

#### Required for Contact Form:
- `RESEND_API_KEY` - Get from https://resend.com

#### Required for Booking/Payments:
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Publishable key from Stripe
- `STRIPE_SECRET_KEY` - Secret key from Stripe  
- `STRIPE_PRICE_ID` - Price ID for the holiday session product

#### Optional (for database features):
- Postgres connection strings (auto-added by Vercel if you connect a database)

### 2. External Services Setup

#### Stripe Setup
1. Create/Login to Stripe account at https://dashboard.stripe.com
2. Create a product for "Holiday Family Portrait Session"
3. Set price (e.g., $85.00 or $20 deposit)
4. Copy the Price ID
5. Get your API keys from Developers → API keys
6. Use **Live** keys for production (pk_live_... and sk_live_...)

#### Resend Email Setup
1. Sign up at https://resend.com
2. Add and verify your domain: `shootsxladders.com`
3. Add DNS records for domain verification:
   - Add the TXT, MX, and other records provided by Resend
   - This allows emails to be sent from `bookings@shootsxladders.com`
4. Create an API key in the Resend dashboard
5. Copy the key (starts with `re_`)

### 3. DNS Configuration

For the subdomain `buy.shootsxladders.com`:

1. **In Vercel Dashboard:**
   - Go to your project → Settings → Domains
   - Click "Add Domain"
   - Enter: `buy.shootsxladders.com`
   - Vercel will provide DNS instructions

2. **In Your Domain Registrar (GoDaddy/Namecheap/etc):**
   - Go to DNS settings for `shootsxladders.com`
   - Add a CNAME record:
     - **Type**: CNAME
     - **Name**: `buy`
     - **Value**: `cname.vercel-dns.com`
     - **TTL**: 3600 (or automatic)
   - Save changes
   - Wait 5-60 minutes for DNS propagation

## 🚀 Deployment Steps

### Step 1: Push to GitHub (if not already done)

```bash
cd /Users/michaelrodgers/Desktop/shootsxladderslanding
git add .
git commit -m "Fix: Add missing API routes and success page"
git push origin main
```

### Step 2: Deploy to Vercel

**Option A: Connect GitHub Repository (Recommended)**
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure project:
   - Framework Preset: Next.js
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`
4. Click "Deploy"

**Option B: Deploy via CLI**
```bash
cd /Users/michaelrodgers/Desktop/shootsxladderslanding
npx vercel login
npx vercel --prod
```

### Step 3: Add Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add each variable:
   - Click "Add New"
   - Enter key and value
   - Select all environments (Production, Preview, Development)
   - Click "Save"

Required variables:
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_SECRET_KEY
STRIPE_PRICE_ID
RESEND_API_KEY
```

### Step 4: Redeploy After Adding Variables

After adding environment variables:
1. Go to Deployments tab
2. Click the three dots on the latest deployment
3. Click "Redeploy"

Or trigger a new deployment by pushing to GitHub.

### Step 5: Configure Custom Domain

1. In Vercel project → Settings → Domains
2. Add domain: `buy.shootsxladders.com`
3. Update your DNS as instructed by Vercel
4. Wait for DNS propagation and SSL certificate generation
5. Vercel will automatically provision SSL certificate

## 🧪 Testing After Deployment

### Test Contact Form
1. Visit https://buy.shootsxladders.com
2. Scroll to "Holler at Us" section
3. Click "Contact Us"
4. Fill out and submit the form
5. Check if you receive an email at `shootsandladders@gmail.com`

### Test Booking Flow (if implemented)
1. Select a date and time
2. Click "Book Now"
3. Complete payment with a test card
4. Verify redirect to success page
5. Check Stripe dashboard for payment

## ⚠️ Important Notes

### Update Contact Email
In `/src/app/api/contact/route.ts`, line 22, update the email address:
```typescript
to: ['shootsandladders@gmail.com'], // Replace with your actual business email
```

### Security
- Never commit `.env.local` to Git
- Use test keys during development
- Only use live keys in production
- Rotate keys if they are exposed

### Current Status
The site is a **landing/portfolio page** with:
- ✅ Hero section with branding
- ✅ Service descriptions (Corporate & Holiday sessions)
- ✅ About section
- ✅ Contact form (sends emails via Resend)
- ✅ Success page for bookings
- ✅ API routes for contact and checkout

Note: The page.tsx references a "Book a Holiday Session" button that links to `buy.shootsxladders.com`, but doesn't currently have the full booking calendar/payment flow implemented on the main page.

## 🔄 Continuous Deployment

Once connected to GitHub, Vercel will automatically:
- Deploy on every push to main branch
- Create preview deployments for pull requests
- Run builds and checks before deploying

## 📞 Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Stripe Docs**: https://stripe.com/docs
- **Resend Docs**: https://resend.com/docs

## ✨ Post-Deployment

After successful deployment:
1. Test the contact form thoroughly
2. Update your main website to link to `buy.shootsxladders.com`
3. Share the booking link on social media
4. Monitor Vercel logs for any errors
5. Check Stripe dashboard for payments
6. Verify emails are being sent and received

---

Your site is now ready to deploy! 🎉


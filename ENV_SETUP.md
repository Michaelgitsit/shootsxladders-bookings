# Environment Variables Setup

This file explains how to set up your environment variables for the Shoots & Ladders booking site.

## Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

### Stripe Configuration
```bash
# Get these from https://dashboard.stripe.com/apikeys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_publishable_key_here
STRIPE_SECRET_KEY=sk_live_your_secret_key_here
STRIPE_PRICE_ID=price_your_price_id_here
```

### Email Configuration
```bash
# Get this from https://resend.com/api-keys
RESEND_API_KEY=re_your_resend_api_key_here
```

### Optional: Vercel Postgres
```bash
# These are automatically added by Vercel when you connect a database
# Only needed if using the database features
POSTGRES_URL=
POSTGRES_PRISMA_URL=
POSTGRES_URL_NON_POOLING=
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=
```

## Setup Instructions

### 1. Local Development

1. Copy these variables into a new `.env.local` file
2. Replace placeholder values with your actual API keys
3. Restart your development server

### 2. Vercel Deployment

Add these environment variables in your Vercel dashboard:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add each variable one by one
4. Make sure to select all environments (Production, Preview, Development)
5. Redeploy your site after adding variables

## Getting Your API Keys

### Stripe
1. Go to https://dashboard.stripe.com/apikeys
2. For testing: Use Test mode keys (pk_test_ and sk_test_)
3. For production: Use Live mode keys (pk_live_ and sk_live_)
4. Create a product and price to get the STRIPE_PRICE_ID

### Resend
1. Sign up at https://resend.com
2. Verify your email
3. Add and verify your domain (shootsxladders.com)
4. Create an API key in the dashboard
5. Copy the key (starts with re_)

## Security Notes

- **NEVER** commit `.env.local` to Git
- The `.env.local` file is already in `.gitignore`
- Only share API keys through secure channels
- Use test keys for development
- Rotate keys if they are ever exposed


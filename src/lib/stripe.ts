import { loadStripe as loadStripeJS } from '@stripe/stripe-js';

let stripePromise: ReturnType<typeof loadStripeJS>;

export const loadStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripeJS(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
};

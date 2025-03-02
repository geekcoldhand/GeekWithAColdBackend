import { loadStripe } from '@stripe/stripe-js';

// Load the Stripe publishable key from environment variables
const StripePromise = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default StripePromise;
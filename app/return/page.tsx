import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

async function getSession(sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId!);
  return session;
}

export default async function CheckoutReturn({ searchParams }: any) {
  const sessionId = searchParams.session_id;
  const session = await getSession(sessionId);

 // console.log("return page", session);

  if (session?.status === "open") {
    return <p>Oh No! Payment did not work. Please try again. </p>;
  }

  if (session?.status === "complete") {
    return (
      <h3>
       Thank you for supporting your local Atelier. Please check your email for confirmation and shipping details.
      </h3>
    );
  }

  return null;
}
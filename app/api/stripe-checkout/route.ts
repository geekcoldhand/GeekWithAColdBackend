import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const origin = process.env.NEXTAUTH_URL as string;

const StripeChecout = async (req: Request) => {
    const { price } = await req.json();
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                price: price,
                quantity: 1,
            },
        ],
        mode: "payment",
        success_url: `${origin}/success`,
        cancel_url: `${origin}/cancel`,
    });
    return NextResponse.json({ url: session.url });
};  

export { StripeChecout };
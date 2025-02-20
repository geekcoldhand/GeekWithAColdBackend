import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const origin = process.env.NEXTAUTH_URL as string;

export async function POST(req: Request) {
    const { price } = await req.json();

    // Create a Stripe checkout session
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

    // Return the session URL as a JSON response
    return NextResponse.json({ url: session.url });
}
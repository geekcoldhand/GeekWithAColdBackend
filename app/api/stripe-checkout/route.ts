import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const origin = process.env.NEXTAUTH_URL as string;

export async function POST(req: Request) {
	try {
		const { amount, currency } = await req?.json();

		const session = await stripe.checkout.sessions.create({
			ui_mode: "embedded",
			payment_method_types: ["card"],
			line_items: [
				{
					price_data: {
						currency: currency,
						product_data: {
							name: "T-shirt", //TODO: Replace with actual name
						},
						unit_amount: 2000, //TODO: Replace with actual price
					},
					quantity: 1, //TODO: Replace with actual quantity
				},
			],
			mode: "payment",
			return_url: `${origin}/return?session_id={CHECKOUT_SESSION_ID}`,
		});

		//console.log("Stripe checkout session created from API", session);
		return NextResponse.json({ client_secret: session.client_secret });
	} catch (error) {
		console.error("Error creating Stripe checkout session:", error);
		return NextResponse.json(
			{ error: "Failed to create Stripe checkout session" },
			{ status: 500 }
		);
	}
}

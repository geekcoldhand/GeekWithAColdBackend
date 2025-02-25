"use client";
import React, { JSX, useState, useRef } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

export default function StripeCheckout({
	price,
}: {
	price: number;
}): React.ReactNode {
	const stripe = useStripe();
	const elements = useElements();
	const [isLoading, setIsLoading] = useState(false);
	

	const cardElement = elements?.getElement(CardElement);
	
	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		console.log("handle submit step 1");
        if ( !cardElement) {
            // Handle the case where cardElement is null
            alert("Error: Card element not found.");
            return;
        }
		if (!stripe || !elements) {
			return;
		}
		setIsLoading(true);
		console.log("handle submit step 2");

		const stripePaymentResponse = await fetch("/api/stripe-checkout", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				amount: price * 10,
				currency: "usd",
			}),
		});
		const { clientSecret } = await stripePaymentResponse.json();
		const { error, paymentIntent } = await stripe.confirmCardPayment(
			clientSecret,
			{
				payment_method: {
					card: cardElement,
				},
			}
		);
		if (error) {
			alert("Oh no! Your card payment didn't go through. Please try again.");
		} else {
			alert("GWACH thanks you for your purchase!");
		}
		setIsLoading(false);
	};

	return (
		<form className = "stripe-element-form" onSubmit={handleSubmit}>
			<CardElement className="stripe-card" ></CardElement>	
			<button className = "stripe-element-button" type="submit" disabled={!stripe || isLoading}>
				{isLoading ? "Processing..." : "Pay"}
				</button>
			
		</form>
	);
}

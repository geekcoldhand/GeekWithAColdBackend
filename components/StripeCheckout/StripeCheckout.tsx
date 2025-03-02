"use client";
import React, { JSX, useState, useRef, useCallback } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {
	EmbeddedCheckout,
	EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import StripePromise from "../../context/stripePromise";

const stripe = StripePromise;

export default function StripeCheckout({
	price,
}: {
	price: number;
}): React.ReactNode {
	const [isLoading, setIsLoading] = useState(false);
	const [showCheckout, setShowCheckout] = useState(false);

	const fetchClientSecret = useCallback(() => {
		return fetch("/api/stripe-checkout", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				amount: price * 10,
				currency: "usd",
			}),
		})
			.then((res) => res.json())
			.then((data) => data.client_secret);
	}, []);

	const options = { fetchClientSecret };
	//console.log("Client fetching secret", fetchClientSecret());

	const handleCheckoutClick = (event: React.FormEvent) => {
		event.preventDefault();
		console.log("handle submit step 1");

		setIsLoading(true);
		setShowCheckout(true);
	};

	return (
		<div className="stripe-element-form">
			{showCheckout && (
				<EmbeddedCheckoutProvider stripe={stripe} options={options}>
					<EmbeddedCheckout />
				</EmbeddedCheckoutProvider>
			)}
			<button
				onClick={handleCheckoutClick}
				className="stripe-element-button"
				disabled={isLoading}
			>
				{isLoading ? "Processing..." : "Checkout"}
			</button>
		</div>
	);
}

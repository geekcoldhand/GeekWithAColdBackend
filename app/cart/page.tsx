"use client";
import React from "react";
import { useGlobalContext } from "../../context/CartContext";
import Link from "next/link";
import CartItem from "../../components/Cart/CartItem";
import StripeCheckout from "../../components/StripeCheckout/StripeCheckout";

const CartItems = () => {
	const { state, clear } = useGlobalContext();
	const { cart, total } = state;

	//OnClick show the hidden toggle class
	const handleShowToggle = (e: Event) => {
		e.preventDefault();
		console.log("handleShowToggle");
		const offScreenCheckout = document.querySelector(".off-screen-checkout");
		offScreenCheckout?.classList.toggle("active");
	};

	if (cart.length < 1) {
		return (
			<h1>
				<div className="empty" style={{ textAlign: "center" }}>
					<h2
						style={{
							marginBottom: "1rem",
							marginTop: "1.5rem",
						}}
					>
						Your garment bag is empty.
					</h2>
					<Link href="/products" className="link-btn">
						Browse Atelier
					</Link>
				</div>
			</h1>
		);
	}
	return (
		<div className="section section-center">
			<h1
				style={{
					textAlign: "center",
					paddingTop: "0.5rem",
					fontWeight: "lighter",
				}}
			>
				{" "}
				Order Summary
			</h1>

			{cart.map((item) => {
				return <CartItem key={item.id} {...item} />;
			})}
			<hr />
			<div className="link-container">
				<Link href="/products" className="link-btn">
					Browse Atelier
				</Link>
				<button
					type="button"
					className="link-btn "
					onClick={(e) => handleShowToggle}
				>
					Checkout
				</button>
			</div>
			<div className="cart-total-checkout">
				<article>
					<h3>
						Total : <span>${total}</span>
					</h3>
				</article>

				<StripeCheckout price={total} />
			</div>
		</div>
	);
};

export default CartItems;

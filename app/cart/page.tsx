"use client";
import React from "react";
import { useGlobalContext } from "../../context/CartContext";
import Link from "next/link";
import CartItem from "../../components/Cart/CartItem";
import StripeCheckout from "../../components/StripeCheckout/StripeCheckout";

const CartItems = () => {
	const { state, clear } = useGlobalContext();
	const { cart, total } = state;



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
					paddingTop: "0rem",
					fontWeight: "lighter",
				}}
			>
				
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

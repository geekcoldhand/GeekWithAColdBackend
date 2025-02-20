import React from "react";
import { useGlobalContext } from "../../context/CartContext";
import type { StaticImageData } from "next/image";
import  Image  from "next/image";
import AmountButtons from "../AmountButtons/AmountButtons";
import "./Cart.css";

// Define the props for CartItem
interface CartItemProps {
	id: string;
	name: string;
	image: string | StaticImageData; // Allow both string and StaticImageData
	price: number;
	amount: number;
}

const CartItem = React.memo(function CartItem({
	id,
	name,
	image,
	price,
	amount,
}: CartItemProps) {
	const { remove, decrease, increase } = useGlobalContext();

	return (
		<div className="cart">
			<div className="title">
				<Image
					src={typeof image === "string" ? image : image.src} // Handle StaticImageData
					alt={name}
					width={100}
					height={100}
				/>
				<div>
					<h5 className="name">{name}</h5>
					<h5 className="price-small">${price}</h5>
				</div>
			</div>

			<AmountButtons
				amount={amount}
				inc={() => increase(id)}
				dec={() => decrease(id)}
			/>

			<h5 className="subtotal">${price * amount}</h5>
			<button type="button" className="remove-btn" onClick={() => remove(id)}>
				<svg
					data-slot="icon"
					fill="none"
					width={16}
					strokeWidth="1.5"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
					></path>
				</svg>
			</button>
		</div>
	);
});

export default CartItem;

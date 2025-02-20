"use client"; // Mark this as a Client Component

import React, { useState } from "react";
import Link from "next/link";
import { useGlobalContext } from "../../context/CartContext";
import { useProductsContext } from "../../context/ProductContext";
import "./Cart.css";
import { StaticImageData } from "next/image";

interface Product {
	id: string;
	name: string;
	price: number;
	amount: number;
	image: string | StaticImageData;
	stock: number;
}

interface AddToCartProps {
	product: Product;
}

const AddToCart = React.memo(function AddToCart({ product }: AddToCartProps) {
	const { addToCart } = useGlobalContext();
	const { id, stock } = product;

	const [amount, setAmount] = useState(1);

	const increase = () => {
		setAmount((oldAmount) => {
			let tempAmount = oldAmount + 1;
			if (tempAmount > stock) {
				tempAmount = stock;
			}
			return tempAmount;
		});
	};

	const decrease = () => {
		setAmount((oldAmount) => {
			let tempAmount = oldAmount - 1;
			if (tempAmount < 1) {
				tempAmount = 1;
			}
			return tempAmount;
		});
	};

	return (
		<div className="btn-container">
			<Link
				href="" // Replace with the actual href if needed
				className="add-cart"
				onClick={() => addToCart(id, amount, product)}
			>
				Add to Bag
			</Link>
			{/* Include AmountButtons if needed */}
			{/* <AmountButtons amount={amount} increase={increase} decrease={decrease} /> */}
		</div>
	);
});

export default AddToCart;

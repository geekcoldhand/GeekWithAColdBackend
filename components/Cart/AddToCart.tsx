"use client"; // Mark this as a Client Component

import React, { useState } from "react";
import Link from "next/link";
import { useGlobalCartContext } from "../../context/CartContext";
import "./Cart.css";
import { StaticImageData } from "next/image";

interface Product {
	id: string;
	name: string;
	price: number;
	amount: number;
	image: string | StaticImageData;
	stock: number;
	size: string;

}

interface AddToCartProps {
	product: Product;
}

const AddToCart = React.memo(function AddToCart({ product }: AddToCartProps) {
	const { addToCart } = useGlobalCartContext();
	const { id, stock } = product;
	const [amount, setAmount] = useState(1);
	const [size, setSize] = useState("");

	const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		// filter if the s, m or l selected
		if (
			e.target.value === "s" ||
			e.target.value === "m" ||
			e.target.value === "l" ||
			e.target.value === "t"
		) {
			setSize(e.target.value);
		} else {
			setSize("");
		}
	};

	const handleAddToCart = (e: any) => {
		e.preventDefault();
		if (size === "") {
			alert("Please select a size");
			return;
		}
		addToCart(id, amount, product);
	};

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
			<div className="size-container">
				<button className="size-chart">Size Chart</button>
				<select onChange={handleSizeChange}>
					<option value="">Select Size</option>
					<option value="s">Small</option>
					<option value="m">Medium</option>
					<option value="l">Large</option>
					<option value="t">Tailored</option>
				</select>
			</div>

			<Link
				href="" // Replace with the actual href if needed
				className="add-cart"
				onClick={(e) => handleAddToCart(e)}
			>
				Add to Bag
			</Link>
			{/* Include AmountButtons if needed */}
			{/* <AmountButtons amount={amount} increase={increase} decrease={decrease} /> */}
		</div>
	);
});

export default AddToCart;

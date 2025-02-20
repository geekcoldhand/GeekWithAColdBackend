"use client";

import React from "react";
import Link from "next/link";
import { useProductsContext } from "../../context/ProductContext";
import Image from "next/image";
import { StaticImageData } from "next/image";
import Sandbox from "@/components/Sandbox/Sandbox";

import "./ProductList.css";

// Define types for the product
interface Product {
	id: string;
	name: string;
	amount: number;
	image: string | StaticImageData;
	price: number;
}

const ProductList = () => {
	const { products } = useProductsContext();

	return (
		<>
			<div className="centered-content">
				<div className="cocktails-center">
					{products.map((product: Product) => {
						const { id, image, name, price } = product;
						return (
							<article key={id} className="cocktail">
								<Link href={`/products/${id}`} className="add-cart">
									<div className="img-container">
										<Image
											src={typeof image === "string" ? image : image.src}
											alt={name}
										/>
									</div>
									<div className="cocktail-footer">
										<div className="product">
											<h4>{` $${price}`}</h4>
										
											<h3>{name}</h3>
										</div>
									</div>
								</Link>
							</article>
						);
					})}
				</div>
			</div>
			<Sandbox />
		</>
	);
};

export default ProductList;

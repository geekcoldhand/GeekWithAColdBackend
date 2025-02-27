"use client";

import React from "react";
import { useProductsContext } from "../../../context/ProductContext";
import { useParams } from "next/navigation";
import AddToCart from "../../../components/Cart/AddToCart";
import "./singleProduct.css";
import Image from "next/image";

const SingleProductPage = () => {
	const { id } = useParams();
	const { products } = useProductsContext();

	const temp = products.filter((product) => product.id === id);
	return (
		<div className="single-prod-container">
			{temp.map((products) => {
				const { name, price, description, amount, image } = products;
				return (
					<div className="container" key={products.id}>
						<button
							className="back-button"
							onClick={() => window.history.back()}
						>
							<svg
								data-slot="icon"
								fill="none"
								strokeWidth="1.5"
								width={"1.5rem"}
								height={"1.5rem"}
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
								></path>
							</svg>
						</button>

						<div className="product-center" >
							<Image
								className="prod-photo"
								src={typeof image === "string" ? image : image.src}
								alt={name}
								width={300}
								height={300}
							/>
							<section className="content-prod">
								<h2>{name}</h2>
								{<AddToCart product={products} />}
								<h5 className="price-prod">${price}</h5>
								<p className="description"> {description}</p>
								<p className="info-prod">
									<span>Available : </span>
									In stock
								</p>
							</section>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default SingleProductPage;

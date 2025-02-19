"use client";

import React from "react";
import { useProductsContext } from "../../../context/ProductContext";
import { useParams } from "next/navigation";
import AddToCart from "../../../components/Cart/AddToCart";
import "./singleProduct.css";

const SingleProductPage = () => {
	const { id } = useParams();
	const { products } = useProductsContext();

	const temp = products.filter((product) => product.id === id);
	return (
		<div className="single-prod-container">
			{temp.map((products) => {
				const { name, price, description, amount, image } = products;
				return (
					<div className="product-center" key={products.id}>
						<img
							className="prod-photo"
							src={typeof image === "string" ? image : image.src}
							alt={name}
						/>
						<section className="content-prod">
							<h2>{name}</h2>
							{{ amount } && <AddToCart product={products} />}
							<p className="description"> {description}</p>

							<h5 className="price-prod">${price}</h5>
							<button className="size-chart">Size Chart</button>
							<p className="info-prod">
								<span>Available : </span>
								In stock
							</p>
						</section>
					</div>
				);
			})}
		</div>
	);
};

export default SingleProductPage;

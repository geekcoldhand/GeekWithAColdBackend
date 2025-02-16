'use client';
import React from "react";
import Link from "next/link"; 
import { useProductsContext } from "../../context/ProductContext";
import "./ProductList.css";

const ProductList = () => {
    const { products } = useProductsContext();
	return (
		<>
			<div className="centered-content">
				<div className="cocktails-center">
					{products.map((product: any) => {
						const { id, image, name, price } = product;
						return (
							<article key={id} className="cocktail">
								<Link href={`/products/${id}`} className="add-cart">
									<div className="img-container">
										<img src={image} alt={name} />
									</div>

									<div className="cocktail-footer">
										<div className="product">
											<h4>{name}</h4>
										</div>

										{/*className="prod-details">*/}
									</div>
								</Link>
							</article>
						);
					})}
				</div>
			</div>
		</>
	);
};
export default ProductList;

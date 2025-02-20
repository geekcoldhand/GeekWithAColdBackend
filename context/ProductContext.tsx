"use client";

import React, { useReducer, useContext, createContext, ReactNode } from "react";
import data from "./data";
import { StaticImageData } from "next/image";

// Define types for the product
interface Product {
	id: string;
	name: string;
	price: number;
	amount: number;
    image: string | StaticImageData;
    description: string;
    stock: number;
}

// Define types for the state
interface State {
	products: Product[];
}

// Define types for the actions
type Action =
	| { type: "INC"; payload: string } // `payload` is the product ID
	| { type: "DEC"; payload: string }
	| { type: "ADD_TO_CART"; payload: string };

// Define the context type
interface ProductsContextType {
	products: Product[];
	inc: (id: string) => void;
	dec: (id: string) => void;
	addToCart: (id: string) => void;
}

// Create the context with a default value
const ProductsContext = createContext<ProductsContextType | null>(null);

// Reducer function
const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case "INC":
			let tempProductsInc = state.products.map((item) => {
				if (item.id === action.payload) {
					return { ...item, amount: item.amount + 1 };
				}
				return item;
			});
			return { ...state, products: tempProductsInc };

		case "DEC":
			let tempProductsDec = state.products.map((item) => {
				if (item.id === action.payload) {
					return { ...item, amount: item.amount - 1 };
				}
				return item;
			});
			return { ...state, products: tempProductsDec };

		default:
			return state;
	}
};

// Initial state
const initialState: State = {
	products: data,
};

// Products Provider component
const ProductsProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const addToCart = (id: string) => {
		dispatch({ type: "ADD_TO_CART", payload: id });
	};

	const inc = (id: string) => {
		dispatch({ type: "INC", payload: id });
	};

	const dec = (id: string) => {
		dispatch({ type: "DEC", payload: id });
	};

	return (
		<ProductsContext.Provider value={{ ...state, inc, dec, addToCart }}>
			{children}
		</ProductsContext.Provider>
	);
};

// Custom hook to use the products context
export const useProductsContext = () => {
	const context = useContext(ProductsContext);
	if (!context) {
		throw new Error(
			"useProductsContext must be used within a ProductsProvider"
		);
	}
	return context;
};

export { ProductsContext, ProductsProvider };

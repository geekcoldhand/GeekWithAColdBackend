"use client";
import { StaticImageData } from "next/image";
import React, {
	useReducer,
	useEffect,
	createContext,
	useContext,
	ReactNode,
} from "react";

// Define types for the cart item
interface CartItem {
	id: string;
	name: string;
	amount: number;
	image: string | StaticImageData;
	price: number;
	stock: number;
}

// Define types for the state
interface State {
	cart: CartItem[];
	amount: number;
	total: number;
}

// Define types for the actions
type Action =
	| { type: "CLEAR" }
	| { type: "REMOVE"; payload: string }
	| {
			type: "CART";
			payload: { id: string; amount: number; product: CartItem; size: string };
	  }
	| { type: "INC"; payload: string }
	| { type: "DEC"; payload: string }
	| { type: "GET_TOTALS" };

// Create the context with a default value
const Cart = createContext<{
	state: State;
	addToCart: (
		id: string,
		amount: number,
		product: CartItem,
		size: string
	) => void;
	clear: () => void;
	decrease: (id: string) => void;
	increase: (id: string) => void;
	remove: (id: string) => void;
} | null>(null);

// Reducer function
const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case "CLEAR":
			return { ...state, cart: [] };

		case "REMOVE":
			const tempCart = state.cart.filter((item) => item.id !== action.payload);
			return { ...state, cart: tempCart };

		case "CART":
			const { id, amount, product } = action.payload;
			const tempItem = state.cart.find((i) => i.id === id);
			if (tempItem) {
				const tempCart = state.cart.map((cartItem) => {
					if (cartItem.id === id) {
						let newAmount = cartItem.amount + amount;
						if (newAmount > cartItem.stock) {
							newAmount = cartItem.stock;
						}
						return { ...cartItem, amount: newAmount };
					} else {
						return cartItem;
					}
				});
				return { ...state, cart: tempCart };
			} else {
				const newItem = {
					id: id,
					name: product.name,
					amount: product.amount,
					image: product.image,
					price: product.price,
					stock: product.stock,
				};
				return { ...state, cart: [...state.cart, newItem] };
			}

		case "INC":
			let tempCartInc = state.cart.map((item) => {
				if (item.id === action.payload && state.amount < 10) {
					let newAmount = item.amount + 1;
					if (newAmount > item.stock && state.amount < 10) {
						newAmount = item.stock;
					}
					return { ...item, amount: newAmount };
				}
				return item;
			});
			return { ...state, cart: tempCartInc };

		case "DEC":
			let tempCartDec = state.cart.map((item) => {
				if (item.id === action.payload) {
					let decAmount = item.amount - 1;
					if (decAmount < 1) {
						decAmount = 1;
					}
					return { ...item, amount: decAmount };
				}
				return item;
			});
			return { ...state, cart: tempCartDec };

		case "GET_TOTALS":
			let { total, amount: totalAmount } = state.cart.reduce(
				(cartTotal, cartItem) => {
					const { price, amount: itemAmount } = cartItem; // Renamed to avoid conflict
					const itemTotal = price * itemAmount;

					cartTotal.total += itemTotal;
					cartTotal.amount += itemAmount;
					return cartTotal;
				},
				{
					total: 0,
					amount: 0,
				}
			);
			total = parseFloat(total.toFixed(2));
			return { ...state, total, amount: totalAmount }; // Use `totalAmount` here

		default:
			return state;
	}
};

// Get cart data from local storage
const getLocalStorage = (): CartItem[] => {
	if (typeof window !== "undefined") {
		let cart = localStorage.getItem("cart");
		if (cart) {
			return JSON.parse(cart);
		}
	}
	return [];
};

// Initial state
const initialState: State = {
	cart: getLocalStorage(),
	amount: 0,
	total: 0,
};

// Cart Provider component
const CartProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	// Add to cart
	const addToCart = (
		id: string,
		amount: number,
		product: CartItem,
		size: string
	) => {
		dispatch({ type: "CART", payload: { id, amount, product, size } });
	};

	// Remove item
	const remove = (id: string) => {
		dispatch({ type: "REMOVE", payload: id });
	};

	// Increase amount
	const increase = (id: string) => {
		dispatch({ type: "INC", payload: id });
	};

	// Decrease amount
	const decrease = (id: string) => {
		dispatch({ type: "DEC", payload: id });
	};

	// Clear cart
	const clear = () => {
		dispatch({ type: "CLEAR" });
	};

	// Update totals and local storage
	useEffect(() => {
		dispatch({ type: "GET_TOTALS" });
		localStorage.setItem("cart", JSON.stringify(state.cart));
	}, [state.cart]);

	return (
		<Cart.Provider
			value={{
				state, // Include `state` as a top-level property
				addToCart,
				clear,
				decrease,
				increase,
				remove,
			}}
		>
			{children}
		</Cart.Provider>
	);
};

// Custom hook to use the cart context
export const useGlobalCartContext = () => {
	const context = useContext(Cart);
	if (!context) {
		throw new Error("useGlobalContext must be used within a CartProvider");
	}
	return context;
};

export { Cart, CartProvider };

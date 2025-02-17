'use client';
import React from "react";
import { useGlobalContext } from "../../context/CartContext";
import Link from "next/link"; 
import CartItem from "../../components/Cart/CartItem";
import StripePay from "../../components/StripeCheckout/StripeCheckout";
import "../globalStyles.css";
//import "./CartItem.css";

const CartItems = () => {
    const { state, clear } = useGlobalContext();
    const { cart, total } = state;
    
  if (cart.length < 1) {
    return (
      <div className="page-100">
        <div className="empty" style={{ textAlign: "center" }}>
          <h2
            style={{
              marginBottom: "1rem",
              marginTop: "1.5rem",
            }}
          >
            Your bags are empty.
          </h2>
          <Link
            href="/products"
            className="link-btn"
          >
            Shop
          </Link>
        </div>
      </div>
    );
  }
  return (
    <>
      <h1 style={{ textAlign: "center", paddingTop: "0.5rem" }}>Cart</h1>
      <div className="section section-center">
              {cart.map((item) => {
        
           return <CartItem key={item.id} {...item} />;
        })}
        <hr />
        <div className="link-container">
          <Link href="/products" className="link-btn">
            Continue Shopping
          </Link>
          <button type="button" className="link-btn clear-btn" onClick={clear}>
            Empty Bag
          </button>
        </div>
        <div className="cart-total-checkout">
          <article>
            <h3>
              Total : <span>${total}</span>
            </h3>
          </article>
          <StripePay price={total} />
        </div>
      </div>
    </>
  );
};

export default CartItems;
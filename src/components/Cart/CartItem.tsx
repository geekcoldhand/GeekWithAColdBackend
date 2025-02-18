import React from "react";
import { useGlobalContext } from "../../context/CartContext";
import type { StaticImageData } from "next/image";
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
        <img
          src={typeof image === "string" ? image : image.src} // Handle StaticImageData
          alt={name}
        />
        <div>
          <h5 className="name">{name}</h5>
          <h5 className="price-small">${price}</h5>
        </div>
      </div>

      {/* TODO: Uncomment if using AmountButtons */}
      {/* <AmountButtons
        amount={amount}
        inc={() => increase(id)}
        dec={() => decrease(id)}
      /> */}

      <h5 className="subtotal">${price * amount}</h5>
      <button
        type="button"
        className="remove-btn"
        onClick={() => remove(id)}
      >
        <i className="fa fa-trash"></i>
      </button>
    </div>
  );
});

export default CartItem;
import React, { useState, useEffect } from "react";
import "./cart.css";

const CartTotal = () => {
  // Read cart data from local storage on component load
  const initialCartData =
    JSON.parse(localStorage.getItem("cartProducts")) || [];
  const [cart, setCart] = useState(initialCartData);

  useEffect(() => {
    // Update local storage whenever the cart changes
    localStorage.setItem("cartProducts", JSON.stringify(cart));
  }, [cart]);

  const total = initialCartData.reduce((acc, el) => acc + el.price, 0);
  return (
    <div className="cartTotal">
      <h3> Total a Pagar: ${total}</h3>
    </div>
  );
};

export default CartTotal;

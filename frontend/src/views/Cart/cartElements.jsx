import React, { useState, useEffect } from "react";
import "./cart.css";

const CartElements = () => {
  // Read cart data from local storage on component load
  const initialCartData =
    JSON.parse(localStorage.getItem("cartProducts")) || [];
  const [cart, setCart] = useState(initialCartData);

  useEffect(() => {
    // Update local storage whenever the cart changes
    localStorage.setItem("cartProducts", JSON.stringify(cart));
  }, [cart]);

  return initialCartData.map((producto) => {
    return (
      <div className="cartContent" key={producto.id}>
        <img src={producto.imageSrc} alt="product-card" />
        <h3 className="name">{producto.name}</h3>
        <h4 className="price">${producto.price}</h4>
      </div>
    );
  });
};

export default CartElements;

import React, { useState, useEffect } from "react";
import CartItemCounter from "./cartItemCounter";

const CartElements = () => {
  // Read cart data from local storage on component load
  const initialCartData =
    JSON.parse(localStorage.getItem("cartProducts")) || [];

  // Utilizar un estado local para almacenar los datos del carrito
  const [cart, setCart] = useState(initialCartData);

  // Efecto para mantener el estado sincronizado con el localStorage
  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(cart));
  }, [cart]);

  return cart.map((producto) => {
    return (
      <div className="cartContent" key={producto.id}>
        <img src={producto.imageSrc} alt="product-card" />
        <h3 className="name">{producto.name}</h3>
        <CartItemCounter product={producto} />
        <h4 className="price">${producto.price*producto.quantity}</h4>
      </div>
    );
  });
};

export default CartElements;

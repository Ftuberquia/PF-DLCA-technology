import React, { useState, useEffect } from "react";
import "./cart.css";

const CartItemCounter = ({ product, updateQuantity }) => {
  // Estado local para almacenar la cantidad
  const [quantity, setQuantity] = useState(product.quantity);

  // Utiliza useEffect para sincronizar la cantidad con el Local Storage.
  useEffect(() => {
    const storedCartProducts =
      JSON.parse(localStorage.getItem("cartProducts")) || [];
    const updatedCart = storedCartProducts.map((item) =>
      item.id === product.id ? { ...item, quantity } : item
    );

    if (quantity !== product.quantity) {
      localStorage.setItem("cartProducts", JSON.stringify(updatedCart));
      // Llama a la función de actualización en el componente padre (CartElements)
      updateQuantity(product.id, quantity);
    }

  }, [quantity, product, updateQuantity]);

  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increase = () => {
    setQuantity(quantity + 1);
  };

  return (
    <>
      <button className="quantity" onClick={decrease}>
        -
      </button>
      <p>{quantity}</p>
      <button className="quantity" onClick={increase}>
        +
      </button>
    </>
  );
};

export default CartItemCounter;

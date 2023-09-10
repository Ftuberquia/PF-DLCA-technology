import React, { useState, useEffect } from "react";

const CartItemCounter = ({ product }) => {
  // Read cart data from local storage on component load
  const initialCartData =
    JSON.parse(localStorage.getItem("cartProducts")) || [];

  // Utilizar un estado local para almacenar los datos del carrito
  const [cart, setCart] = useState(initialCartData);

  const decrease = () => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === product.id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const increase = () => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (item) => item.id === product.id
      );

      if (existingProductIndex !== -1) {
        // Si el producto ya existe en el carrito, suma la cantidad al producto existente
        prevCart[existingProductIndex].quantity += 1;
      } else {
        // Si no existe, agrega el producto al carrito
        prevCart.push({ ...product, quantity: 1 });
      }

      // Actualizar el almacenamiento local cada vez que cambie el carrito
      localStorage.setItem("cartProducts", JSON.stringify(prevCart));

      return [...prevCart]; // Devolver una nueva copia del carrito actualizado
    });
  };

  return (
    <>
      <p className="counter-button" onClick={decrease}>
        -
      </p>
      <p>{product.quantity}</p>
      <p className="counter-button" onClick={increase}>
        +
      </p>
    </>
  );
};

export default CartItemCounter;

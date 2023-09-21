import React, { useState, useEffect } from "react";
import "./cart.css";

const TotalItems = () => {
  const [itemQuantity, setItemQuantity] = useState(0);

  // Función para obtener y calcular la cantidad total de productos en el carrito
  const updateTotalItems = () => {
    const storedCartProducts =
      JSON.parse(localStorage.getItem("cartProducts")) || [];
    const quantity = storedCartProducts.reduce(
      (acc, el) => acc + el.quantity,
      0
    );
    setItemQuantity(quantity);
  };

  // Agrega un efecto adicional para actualizar la cantidad cuando cambie el carrito
  useEffect(() => {
    updateTotalItems();
  }, [localStorage.getItem("cartProducts")]); // Escucha cambios en el carrito en el LocalStorage

  return <span className="cart-items-total">{itemQuantity}</span>;
};

export default TotalItems;

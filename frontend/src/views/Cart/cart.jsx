
import React, { useState, useEffect } from "react";
import CartElement from "./cartElements";
import CartTotal from "./cartTotal";
import "./cart.css";

export default function Cart() {
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    // Leer los datos del carrito desde el Local Storage en el inicio
    const initialCartData =
      JSON.parse(localStorage.getItem("cartProducts")) || [];
    setCartData(initialCartData);
  }, []);

  const updateCartData = (newCartData) => {
    setCartData(newCartData);
  };

  return cartData.length > 0 ? (
    <>
      <CartElement updateCartData={updateCartData} />
      <CartTotal cartData={cartData} />
    </>
  ) : (
    <h2 className="cart-message-center">Tu Carrito Esta Vacio</h2>
  )
}

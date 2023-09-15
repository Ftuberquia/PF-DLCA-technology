import React, { useState, useEffect } from "react";
import CartElement from "./cartElements";
import CartTotal from "./cartTotal";
import TotalItems from "./TotalItems";
import "./cart.css";
import axios from "axios";
import { saveCartToServer } from "../../redux/actions/index";

export default function Cart({ cartProducts}) {
  const handleSaveCart = (cartProducts) => {
    // Llama a la acción para guardar el carrito en el servidor
    saveCartToServer(cartProducts);
  };

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

  const handleSaveDataToServer = () => {
    
    // Obtiene los datos desde el localStorage (supongamos que se encuentran en la clave 'myData')
    const dataToSave = JSON.parse(localStorage.getItem("cartProducts"));
    
    // Llama a la acción para guardar los datos en el servidor
    handleSaveCart(dataToSave);
  };

  return cartData.length > 0 ? (
    <>
      <CartElement updateCartData={updateCartData} />
      <CartTotal cartData={cartData} />
      <button onClick={handleSaveDataToServer}>
        Guardar en la base de datos
      </button>
    </>
  ) : (
    <h2 className="cart-message-center">Tu Carrito Esta Vacio</h2>
  );
}

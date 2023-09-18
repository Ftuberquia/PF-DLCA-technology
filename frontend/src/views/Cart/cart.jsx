import React, { useState, useEffect } from "react";
import CartElement from "./cartElements";
import CartTotal from "./cartTotal";
import TotalItems from "./TotalItems";
import "./cart.css";
import axios from "axios";
import { saveCartToServer } from "../../redux/actions/index";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from "sweetalert2"; // Importa SweetAlert

export default function Cart({ cartProducts}) {

  const { user, isAuthenticated } = useAuth0();


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
    
  };

  return cartData.length > 0 ? (
    <>
      <CartElement updateCartData={updateCartData} />
      <CartTotal cartData={cartData} />
      {/* <button onClick={handleSaveDataToServer}>
        Guardar en la base de datos
      </button> */}
    </>
  ) : (
    // <h2 className="cart-message-center">Tu Carrito Esta Vacio</h2>
    <button
      onClick={() =>
        Swal.fire({
          title: "¡El carrito está vacío!",
          text: "Por favor agregue un producto al carrito",
          icon: "warning",
          confirmButtonText: "Ok",
          confirmButtonColor: "#28a745",
        })
      }
      className="BUY"
    >
      Comprar
    </button>
  );
}
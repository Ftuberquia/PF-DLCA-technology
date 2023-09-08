
// import "./cart.css";
import { NavLink } from "react-router-dom";
import CartElement from "./cartElements";
import CartTotal from "./cartTotal";

export default function Cart() {
  const initialCartData =
  JSON.parse(localStorage.getItem("cartProducts")) || [];

  return initialCartData.length > 0 ? (
    <>
      <CartElement />
      <CartTotal />
    </>
  ) : (
    <h2 className="cart-message-center">Tu Carrito Esta Vacio</h2>
  )
}

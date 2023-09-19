import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CartItemCounter from "./cartItemCounter";
import "./cart.css";


const CartElements = ({ updateCartData }) => {
  // Leer los datos del carrito desde el Local Storage en el inicio
  const initialCartData =
    JSON.parse(localStorage.getItem("cartProducts")) || [];

    console.log(initialCartData)
  const [cart, setCart] = useState(initialCartData);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Sincronizar el estado local con el Local Storage
    localStorage.setItem("cartProducts", JSON.stringify(cart));

    // Calcular el nuevo valor total cuando cambie el carrito
    const newTotalPrice = cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
    setTotalPrice(newTotalPrice);
    // Llama a la función de actualización en el componente principal
    updateCartData(cart);
  }, [cart, updateCartData]);

  const updateQuantity = (productId, newQuantity) => {
    // Actualizar la cantidad en el carrito
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
  };

  const deleteProduct = (id) => {
    const foundId = cart.find((element) => element.id === id);

    const newCart = cart.filter((element) => {
      return element !== foundId;
    });

    setCart(newCart);
  };

  return cart.map((producto) => {
    const totalPrice = producto.price * producto.quantity;
    return (
      <div className="cartcontainer" key={producto.id}>
        <h1>Carrito de Compras</h1>
        <div className="row">
          <div className="col-md-6">
            <h2>Productos</h2>
            <div className="imgsrc">
              <img src={producto.imageSrc} alt="product-card" />
              <h3 className="name">{producto.name}</h3>
              <CartItemCounter
                product={producto}
                updateQuantity={updateQuantity}
              />
            </div>
            <div className="cardproducto">
              {/* <button type="button" className="dismiss">×</button> */}
              <div className="header">
                <div className="image">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
                    <g
                      stroke-linejoin="round"
                      stroke-linecap="round"
                      id="SVGRepo_tracerCarrier"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        stroke-linejoin="round"
                        stroke-linecap="round"
                        stroke-width="1.5"
                        stroke="#000000"
                        d="M20 7L9.00004 18L3.99994 13"
                      ></path>
                    </g>
                  </svg>
                </div>
                <div className="content"></div>
              </div>
              <div className="col-md-6">
                <span className="title">Resumen</span>
                <div className="actions">
                  <li>Subtotal:</li>
                  <button type="button" className="price">
                    ${totalPrice}
                  </button>
                  {/* <Link to={`/compra`}>
                <button type="button" className="track">Pagar</button>
              </Link> */}
                  <Link to={`/compras`}>
                    <button className="comprar">Comprar ahora</button>
                  </Link>
                  <Link to={`/favorites`}>
                    <button className="fav">Mis Favoritos</button>
                  </Link>
                </div>
              </div>
            </div>
            <div>
              <button
                className="cart-delete"
                onClick={() => deleteProduct(producto.id)}
              >
                ❌
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  });
};

export default CartElements;

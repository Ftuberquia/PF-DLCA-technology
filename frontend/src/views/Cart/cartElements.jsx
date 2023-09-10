import React, { useState, useEffect } from "react";
import CartItemCounter from "./cartItemCounter";

const CartElements = ({ updateCartData }) => {
  // Leer los datos del carrito desde el Local Storage en el inicio
  const initialCartData =
    JSON.parse(localStorage.getItem("cartProducts")) || [];

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
      <div className="cartContent" key={producto.id}>
        <img src={producto.imageSrc} alt="product-card" />
        <h3 className="name">{producto.name}</h3>
        <CartItemCounter product={producto} updateQuantity={updateQuantity}/>
        <h4 className="price">${totalPrice}</h4>
        <h3
          className="cart-delete-button"
          onClick={() => deleteProduct(producto.id)}
        >
          ❌
        </h3>
      </div>
    );
  });
};

export default CartElements;

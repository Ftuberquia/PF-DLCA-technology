import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCartItems } from "../../redux/actions/index"; // Asegúrate de importar la acción correcta
import CartItemCounter from "./cartItemCounter";

const CartElements = ({ cartItems, getCartItems }) => {
  useEffect(() => {
    // Llama a la acción para obtener los datos de cartItems
    getCartItems();
  }, [getCartItems]);

  // Utiliza el estado local para almacenar los datos del carrito (si es necesario)
  const [cart, setCart] = useState([]);

  // Elimina un producto del carrito
  const deleteProduct = (id) => {
    // Actualiza el estado local del carrito (si es necesario)
    // const newCart = cart.filter((element) => element.id !== id);
    // setCart(newCart);

    // Despacha una acción para eliminar el producto del carrito en Redux
    // Esto debe estar implementado en tu archivo de acciones y en el reducer
    // Ejemplo de cómo podría verse:
    // deleteProductFromCart(id);
  };

  return (
    <div>
      {cartItems.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <div>
          {cartItems.map((producto) => (
            <div className="cartContent" key={producto.id}>
              <img src={producto.imageSrc} alt="product-card" />
              <h3 className="name">{producto.name}</h3>
              <CartItemCounter product={producto} />
              <h4 className="price">${producto.price * producto.quantity}</h4>
              <h3
                className="cart-delete-button"
                onClick={() => deleteProduct(producto.id)}
              >
                ❌
              </h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  cartItems: state.cartItems, // Mapea cartItems desde el estado de Redux
});

export default connect(mapStateToProps, { getCartItems })(CartElements);

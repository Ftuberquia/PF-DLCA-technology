import "./Cart.css";
import { ClearCartIcon, CartIcon } from "./Icons";
import { useState, useEffect } from "react"; // Importa useState y useEffect en lugar de useSelector y useDispatch
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth0 } from "@auth0/auth0-react";

export default function Cart() {
  const [items, setItems] = useState([]); // Utiliza useState para gestionar el estado de los items del carrito
  const [totalPrice, setTotalPrice] = useState(0); // Utiliza useState para gestionar el estado del precio total
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    // Cargar datos del carrito desde el localStorage al cargar el componente
    const storedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const storedTotalPrice = parseFloat(localStorage.getItem("cartTotalPrice")) || 0;
    setItems(storedItems);
    setTotalPrice(storedTotalPrice);
  }, []);

  useEffect(() => {
    // Actualizar el localStorage cuando cambian los items o el precio total
    localStorage.setItem("cartItems", JSON.stringify(items));
    localStorage.setItem("cartTotalPrice", totalPrice);
  }, [items, totalPrice]);

  const addToCartHandler = (product) => {
    const updatedItems = [...items];
    const existingItemIndex = updatedItems.findIndex((item) => item.id === product.id);

    if (existingItemIndex !== -1) {
      // Si el producto ya está en el carrito, actualiza la cantidad
      updatedItems[existingItemIndex].quantity += 1;
    } else {
      // Si el producto no está en el carrito, agrégalo
      updatedItems.push({ ...product, quantity: 1 });
    }

    setItems(updatedItems);
    calculateTotalPrice(updatedItems);
  };




  return (
    <>
      <label className="cart-button" htmlFor="carritoDeCompras"></label>
      <input id="carritoDeCompras" type="checkbox" hidden />
      <aside className="cart">
        <div className="TOTAL">
          Total: ${totalPrice} {/* Muestra el precio total del carrito */}
        </div>
        <ul className="cart-items">
          {sampleProducts.map((product) => (
            <CartItem
              key={product.id}
              id={product.id}
              imageSrc={product.imageSrc}
              imageAlt={product.imageAlt}
              price={product.price}
              name={product.name}
              quantity={product.quantity}
              removeFromCartHandler={removeFromCartHandler}
              addToCartHandler={addToCartHandler}
            />
          ))}
        </ul>
        <NavLink
          to={`/compra`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <button onClick={cleanDetailHandler} className="BUY">
            COMPRAR
          </button>
        </NavLink>
        <button className="CLEAR" onClick={cleanCartHandler}>
          {" "}
        </button>
      </aside>
    </>
  );
}


  const removeFromCartHandler = (product) => {
    const updatedItems = [...items];
    const existingItemIndex = updatedItems.findIndex((item) => item.id === product.id);

    if (existingItemIndex !== -1) {
      const updatedItem = { ...updatedItems[existingItemIndex] };

      if (updatedItem.quantity === 1) {
        // Si la cantidad es 1, elimina el producto
        updatedItems.splice(existingItemIndex, 1);
      } else {
        // Si la cantidad es mayor a 1, disminuye la cantidad
        updatedItem.quantity -= 1;
        updatedItems[existingItemIndex] = updatedItem;
      }

      setItems(updatedItems);
      calculateTotalPrice(updatedItems);
    }
  };

  const clearDetailHandler = () => {
    if (isAuthenticated) {
      // Realiza la acción deseada cuando el usuario está autenticado
    } else {
      Swal.fire({
        title: "Inicie sesión",
        text: "Por favor inicia sesión para comprar.",
        icon: "warning",
        confirmButtonText: "Iniciar sesión",
        confirmButtonColor: "#28a745",
      }).then((result) => {
        if (result.isConfirmed) {
          loginWithRedirect();
        }
      });
    }
  };

  const calculateTotalPrice = (items) => {
    const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);
    setTotalPrice(totalPrice);
  };

  function CartItem({ id, imageSrc, imageAlt, price, name, quantity }) {
    return (
      <li className={items.length > 1 ? "list2" : "list"}>
        <div className="img-container">
          <img src={imageSrc} alt={imageAlt} />
        </div>
        <div className="name">
          <strong>{name}</strong>
          <p className="precio">
            ${price.toLocaleString("es-ES", { minimumFractionDigits: 2 })}
          </p>
        </div>
        <footer className="footer">
          <button
            className="rest"
            onClick={() => removeFromCartHandler({ id, imageSrc, imageAlt, price, name, quantity })}
          >
            <span className="minus">-</span>
          </button>
          <small className="small">Cant. {quantity}</small>
          <button
            className="add"
            onClick={() => addToCartHandler({ id, imageSrc, imageAlt, price, name, quantity })}
          >
            <span className="plus">+</span>
          </button>
        </footer>
      </li>
    );
  }

  return (
    <>
      <label className="cart-button" htmlFor="carritoDeCompras">
        <CartIcon />
      </label>
      <input id="carritoDeCompras" type="checkbox" hidden />
      <aside className="cart">
        <ul className="carts">
          {items.map((product) => (
            <CartItem key={product.id} {...product} />
          ))}
        </ul>
        <div className="result-container">
          <div className="TOTAL">
            Total: ${totalPrice.toLocaleString("es-ES", { minimumFractionDigits: 2 })}
          </div>
          {items.length > 0 ? (
            isAuthenticated ? (
              <NavLink
                to={`/pay`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <button onClick={clearDetailHandler} className="BUY">
                  Buy
                </button>
              </NavLink>
            ) : (
              <button onClick={clearDetailHandler} className="BUY">
                Buy
              </button>
            )
          ) : (
            <button
              onClick={() =>
                Swal.fire({
                  title: "¡El carrito esta vacio!",
                  text: "Por favor agregue un producto al carrito",
                  icon: "warning",
                  confirmButtonText: "Ok",
                  confirmButtonColor: "#28a745",
                })
              }
              className="BUY"
            >
              Buy
            </button>
          )}
          <button className="CLEAR" onClick={clearCartHandler}>
            {" "}
            <ClearCartIcon />{" "}
          </button>
        </div>
      </aside>
    </>
  );
}

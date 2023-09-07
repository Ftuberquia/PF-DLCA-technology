// import "./cart.css";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

export default function Cart() {
  const items = useSelector((state) => state.items);
  const totalPrice = useSelector((state) => state.totalPrice);
  const dispatch = useDispatch();

  const sampleProducts = [
    {
      id: 1,
      name: 'Producto 1',
      price: 29.99,
      imageSrc: 'imagen1.jpg',
      imageAlt: 'Producto 1',
      quantity: 2,
    },
    {
      id: 2,
      name: 'Producto 2',
      price: 19.99,
      imageSrc: 'imagen2.jpg',
      imageAlt: 'Producto 2',
      quantity: 1,
    },
    {
      id: 3,
      name: 'Producto 3',
      price: 39.99,
      imageSrc: 'imagen3.jpg',
      imageAlt: 'Producto 3',
      quantity: 3,
    },
  ];

  const addToCartHandler = (product) => {
    // Implementa la lógica para agregar un producto al carrito
  };

  const cleanCartHandler = () => {
    // Implementa la lógica para limpiar el carrito
  };

  const removeFromCartHandler = (product) => {
    // Implementa la lógica para eliminar un producto del carrito
  };

  const cleanDetailHandler = () => {
    // Implementa la lógica para limpiar los detalles del carrito
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

function CartItem({ id, imageSrc, imageAlt, price, name, quantity, removeFromCartHandler, addToCartHandler }) {
  return (
    <li>
      <img src={imageSrc} alt={imageAlt} />
      <div className="name">
        <strong>{name}</strong> - ${price}
      </div>
      <footer>
        <button className="rest" onClick={() => removeFromCartHandler({ id })}>-</button>
        <small className="small">Cant. {quantity}</small>
        <button className="add" onClick={() => addToCartHandler({ id })}>+</button>
      </footer>
    </li>
  );
}

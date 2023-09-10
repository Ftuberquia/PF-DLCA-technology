import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getProductDetail,
  cleanDetail,
  addToCart,
} from "../../redux/actions/index";
import { useParams, Link, useHistory } from "react-router-dom";

import {
  addFavorite,
  deleteFavorite,
  fetchData,
} from "../../views/Favorites/funcionesFav";

import style from "./ProductDetail.module.css";
import Swal from "sweetalert2";
import { useAuth0 } from "@auth0/auth0-react"; // Hay que asegurarse de importar useAuth0

const ProductDetail = () => {
  const { id } = useParams();

  const product = useSelector((state) => state.productDetail);
  const [isFavorite, setIsFavorite] = useState(false);
  let [userId, setUserId] = useState(null);

  const dispatch = useDispatch();
  const history = useHistory();
  const [cartQuantity, setCartQuantity] = useState(1); // Estado para la cantidad en el carrito

  // Estado de autenticación
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    dispatch(getProductDetail(id));
    return () => {
      dispatch(cleanDetail());
    };
  }, [dispatch, id]);

  //Para obtener el userId desde el localStorage
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);
  }, []);

  //verificar si el producto esta en favoritos
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        // Llamar a la función fetchData para obtener los productos favoritos del usuario
        const favoriteProducts = await fetchData(userId);
        // Verificar si el producto actual está en la lista de productos favoritos
        const isProductFavorite = favoriteProducts.some(
          (product) => product.id === id
        );

        if (isProductFavorite) setIsFavorite(true);
      } catch (error) {
        console.error(error);
      }
    };
    checkFavoriteStatus();
  }, [userId, id]);

  const addToFavorites = async () => {
    userId = 1; //sacar esto cuando termine de funcionar lo del user
    if (userId === null) {
      alert("Debes iniciar sesión para agregar a favoritos");
    } else {
      const body = { productId: id, userId: userId }; // Crea un objeto con productId y userId
      addFavorite(body)
        .then(() => {
          setIsFavorite(true);
        })
        .catch((error) => console.log(error));
    }
  };

  const removeFromFavorites = async () => {
    deleteFavorite(id, userId)
      .then(() => {
        setIsFavorite(false);
        alert("Producto eliminado de favoritos!");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (!product) {
    return <div>Cargando...</div>;
  }

  function decrementCartQuantity() {
    // disminuye en 1 la cantidad del producto en el carrito, pero solo si la cantidad actual es mayor que 1.
    if (cartQuantity > 1) {
      setCartQuantity(cartQuantity - 1);
    }
  }

  function incrementCartQuantity() {
    // incrementa en 1 la cantidad del producto en el carrito, pero solo si la cantidad actual es menor que el stock del producto.
    if (cartQuantity < product.stock) {
      setCartQuantity(cartQuantity + 1);
    }
  }
  // Agrego el producto al carrito despachando la acción con el producto y su cantidad.
  const handleAddToCart = () => {
    if (product.stock > 0) {
      // Si el producto tiene stock, muestra un mensaje de éxito y redirige al usuario a la página del carrito.
      dispatch(addToCart({ ...product, quantity: cartQuantity }));
      Swal.fire({
        title: "Agregado",
        text: "¡Producto añadido al carrito!",
        icon: "success",
        confirmButtonText: "Ok",
        confirmButtonColor: "#28a745",
      });
      history.push("/cart"); // Redirige a cart para continuar la compra
    } else {
      Swal.fire({
        // En caso contrario, muestra un mensaje de advertencia.
        title: "Lo sentimos",
        text: "No hay stock para este producto",
        icon: "warning",
        confirmButtonText: "Ok",
      });
    }
  };

  // maneja el proceso de compra. Si el usuario está autenticado y el producto tiene stock.
  function handleBuyNow(event) {
    if (isAuthenticated) {
      if (product.stock > 0) {
        dispatch(addToCart({ ...product, quantity: cartQuantity }));
        history.push(`/compra`); // agrega el producto al carrito y redirige al usuario a la página de pago.
      } else {
        Swal.fire({
          // De lo contrario, muestra un mensaje de advertencia o solicita al usuario que inicie sesión.
          title: "Lo sentimos",
          text: "No hay stock para este producto",
          icon: "warning",
          confirmButtonText: "Ok",
        });
      }
    } else {
      handleCartLogin(event);
    }
  }

  // muestra un mensaje de inicio de sesión si el usuario no está autenticado e intenta comprar un producto.
  const handleCartLogin = (event) => {
    Swal.fire({
      // Si el usuario inicia sesión, será redirigido automáticamente a la página del carrito.
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
    event.preventDefault();
  };

  return (
    <div className={style.conteiner}>
      <div className={style.contNavCat}>
        <Link to={"/productos"} className={style.volver}>
          ← Volver al listado
        </Link>
        <p>{product.category}</p>
        <p>{">"}</p>
        <p>{product.subcategory}</p>
      </div>
      <hr />
      <div className={style.contProducto}>
        <div className={style.detalles1}>
          <h1>{product.name}</h1>
          <h3>Marca: {product.brand}</h3>
          {isFavorite ? (
            <button className={style.fav} onClick={removeFromFavorites}>
              ❤️
            </button>
          ) : (
            <button className={style.fav} onClick={addToFavorites}>
              🤍
            </button>
          )}
          <img src={product.imageSrc} alt={product.imageAlt} />
          <hr />
          <div className={style.detalles2}>
            <h2>Descripción</h2>
            <p>{product.description}</p>
          </div>
        </div>
        <div className={style.infoCompra}>
          <h2>$ {product.price}</h2>
          <div className={style.cantidad}>
            <button onClick={decrementCartQuantity}>-</button>
            <p>{cartQuantity}</p>
            <button onClick={incrementCartQuantity}>+</button>
          </div>

          <button className={style.agregarCarrito} onClick={handleAddToCart}>
            Agregar al carrito
          </button>

          {isAuthenticated ? (
            <Link to={`/compra`}>
              <button className={style.comprar} onClick={handleBuyNow}></button>
            </Link>
          ) : (
            <button className={style.comprar} onClick={handleCartLogin}>
              Comprar ahora
            </button>
          )}
        </div>
      </div>

      {/* <form>
                <label htmlFor="comment">Comentario:</label>
                <textarea id="comment" name="comment" />
                <button type="submit">Enviar comentario</button>
            </form>
            <div className="rating">
                <span className="star">&#9733;</span>
                <span className="star">&#9733;</span>
                <span className="star">&#9733;</span>
                <span className="star">&#9734;</span>
                <span className="star">&#9734;</span>
                <p>Calificación promedio: 3 estrellas</p>
            </div> */}
    </div>
  );
};

export default ProductDetail;

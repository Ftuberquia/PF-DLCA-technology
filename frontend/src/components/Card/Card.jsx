import React from "react";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { addToCart, removeFromCart } from "../../redux/actions";
import {
  addFavorite,
  deleteFavorite,
  fetchData,
} from "../../views/Favorites/funcionesFav";

import axios from "axios";

import style from "./Card.module.css";

const Card = ({
  id,
  name,
  imageSrc,
  price,
  rating,
  stock,
  quantity,
  disabled,
}) => {
  const dispatch = useDispatch();

  //Para guardar el userId
  const [userId, setUserId] = useState(null);
  const [cartId, setCartId] = useState(null);

  //favoritos
  const [isFavorite, setIsFavorite] = useState(false);

  // Carrito
  const [isInCart, setIsInCart] = useState(false);

  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated && user) {
      const userIdLogin = user.sub;
      setUserId(userIdLogin);
    }
  }, [isAuthenticated, user]);

  // Verificar si el producto está en el carrito
  const cartProducts = useSelector((state) => state.cart);
  if (cartProducts) {
    cartProducts.forEach((product) => {
      if (product.id === id) {
        setIsInCart(true);
      }
    });
  }

  const addToCartHandler = async () => {
    if (userId === null) {
      // Almacena en el localStorage
      const productToAdd = {
        id,
        name,
        imageSrc,
        price,
        rating,
        stock,
        quantity,
      };
      const storedCartProducts = localStorage.getItem("cartProducts");
      const parsedCartProducts = storedCartProducts
        ? JSON.parse(storedCartProducts)
        : [];

      // Buscar si ya existe un producto con el mismo 'id' en el carrito
      const existingProductIndex = parsedCartProducts.findIndex(
        (item) => item.id === productToAdd.id
      );

      if (existingProductIndex !== -1) {
        // Si el producto ya existe en el carrito, suma la cantidad al producto existente
        parsedCartProducts[existingProductIndex].quantity +=
          productToAdd.quantity;
      } else {
        // Si no existe, agrega el producto al carrito
        parsedCartProducts.push(productToAdd);
      }

      localStorage.setItem("cartProducts", JSON.stringify(parsedCartProducts));
      setIsInCart(true); // Establece el estado como "en el carrito"
    } else {

      const requestBody = {
        quantity_prod: 1, // Reemplaza 10 con el valor que desees enviar
      };

      axios
      .get(`/carts/idcarrito/${userId}`)
      .then((response) => {
        const cartId = response.data; // Obtén el cartId de la respuesta GET
        console.log("Respuesta de la solicitud GET:", cartId);
    
        // Luego, realiza la solicitud POST utilizando el cartId obtenido
        return axios.post(`/carts/${cartId}/${id}`,requestBody);
      })
      .then((response) => {
        console.log("Respuesta de la solicitud POST:", response.data);
      })
      .catch((error) => {
        // Maneja los errores aquí
        console.error("Error en la solicitud:", error);
      });

      // // Usa Redux para agregar el producto al carrito
      // dispatch(
      //   addToCart({
      //     id,
      //     name,
      //     imageSrc,
      //     price,
      //     rating,
      //     stock,
      //   })
      // );
      // setIsInCart(true); // Establece el estado como "en el carrito"
    }
  };

  const removeFromCartHandler = async () => {
    if (userId === null) {
      // Remueve el producto del carrito en el localStorage
      const storedCartProducts = localStorage.getItem("cartProducts");
      const parsedCartProducts = storedCartProducts
        ? JSON.parse(storedCartProducts)
        : [];

      // Encuentra el índice del producto en el carrito
      const index = parsedCartProducts.findIndex(
        (product) => product.id === id
      );

      if (index !== -1) {
        parsedCartProducts.splice(index, 1); // Elimina el producto del carrito
        localStorage.setItem(
          "cartProducts",
          JSON.stringify(parsedCartProducts)
        );
        setIsInCart(false); // Establece el estado como "no en el carrito"
        alert("Producto eliminado del carrito");
      }
    } else {
      // Usa Redux para eliminar el producto del carrito
      dispatch(removeFromCart(id));
      setIsInCart(false); // Establece el estado como "no en el carrito"
    }
  };

  //verificar si el producto esta en favoritos
  const checkFavoriteStatus = async () => {
    if (userId !== null) {
      try {
        // Llamar a la función fetchData para obtener los productos favoritos del usuario
        const favoriteProducts = await fetchData(userId);
        if (!favoriteProducts.message) {
          // Verificar si el producto actual está en la lista de productos favoritos
          const isProductFavorite = favoriteProducts.some((p) => p.id === id);
          setIsFavorite(isProductFavorite);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      setIsFavorite(false);
    }
  };

  useEffect(() => {
    checkFavoriteStatus();
    // eslint-disable-next-line
  }, [userId, id]);

  const addToFavorites = async () => {
    if (userId === null) {
      alert("Debes iniciar sesión para agregar a favoritos");
    } else {
      try {
        await addFavorite(id, userId);
        setIsFavorite(true);
      } catch (error) {
        console.error("Error al agregar a favoritos:", error);
      }
    }
  };

  const removeFromFavorites = async () => {
    try {
      await deleteFavorite(id, userId);
      setIsFavorite(false);
      alert("Producto eliminado de favoritos!");
    } catch (error) {
      console.error("Error al eliminar de favoritos:", error);
    }
  };

  return (
    <div className={style.card}>
      <NavLink to={`/product/${id}`} style={{ textDecoration: "none" }}>
        <img className={style.image} src={imageSrc} alt="" />
        <div className={style.detailCard}>
          <h1>${price}</h1>
          <h3 key={id}>{name}</h3>
          {/* <p>Rating: {rating}</p> */}
        </div>
      </NavLink>
      <button
        className={style.cartButton}
        onClick={isInCart ? removeFromCartHandler : addToCartHandler}
      >
        {isInCart ? "Eliminar del carrito" : "Agregar al carrito"}
      </button>
      {isFavorite ? (
        <button className={style.fav} onClick={removeFromFavorites}>
          ❤️
        </button>
      ) : (
        <button className={style.fav} onClick={addToFavorites}>
          🤍
        </button>
      )}
    </div>
  );
};

export default Card;

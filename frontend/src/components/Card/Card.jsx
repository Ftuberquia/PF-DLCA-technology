import React from "react";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/actions";
import {
  addFavorite,
  deleteFavorite,
  fetchData,
} from "../../views/Favorites/funcionesFav";

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

  //favoritos
  const [isFavorite, setIsFavorite] = useState(false);

  // Carrito
  const [isInCart, setIsInCart] = useState(false);

  //Para obtener el userId desde el localStorage
  let [userId, setUserId] = useState(null);
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);
  }, []);

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
        (product) => product.id === id
      );

      if (existingProductIndex !== -1) {
        // Si el producto ya existe en el carrito, suma la cantidad al producto existente
        parsedCartProducts[existingProductIndex].quantity += quantity;
      } else {
        // Si no existe, agrega el producto al carrito
        parsedCartProducts.push(productToAdd);
      }
      localStorage.setItem("cartProducts", JSON.stringify(parsedCartProducts));
      setIsInCart(true); // Establece el estado como "en el carrito"
    } else {
      // Usa Redux para agregar el producto al carrito
      dispatch(
        addToCart({
          id,
          name,
          imageSrc,
          price,
          rating,
          stock,
          quantity,
        })
      );
      setIsInCart(true); // Establece el estado como "en el carrito"
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
  useEffect(() => {
    // eslint-disable-next-line
    userId = 1; //sacar esto cuando termine de funcionar lo del user
    const checkFavoriteStatus = async () => {
      try {
        // Llamar a la función fetchData para obtener los productos favoritos del usuario
        const favoriteProducts = await fetchData(userId);
        // Verificar si el producto actual está en la lista de productos favoritos
        const isProductFavorite = favoriteProducts.some(
          (product) => product.id === id
        );
        setIsFavorite(isProductFavorite);
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
      // //almacenar en el localStorage
      // const productToAdd={
      //     id,
      //     name,
      //     imageSrc,
      //     price,
      //     rating,
      // }
      // const storedFavProducts = localStorage.getItem("favProducts");
      // // Verificar si hay productos en el carrito en el localStorage
      // const parsedFavProducts = storedFavProducts ? JSON.parse(storedFavProducts) : [];
      // parsedFavProducts.push(productToAdd)
      // localStorage.setItem("favProducts", JSON.stringify(parsedFavProducts));
      // setIsFavorite(true);
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
    userId = 1; //sacar esto cuando termine de funcionar lo del user
    deleteFavorite(id, userId)
      .then(() => {
        setIsFavorite(false);
        alert("Producto eliminado de favoritos!");
      })
      .catch((error) => {
        console.error(error);
      });
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

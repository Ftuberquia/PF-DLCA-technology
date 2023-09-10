import React from "react";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

import { addToCart, removeFromCart } from "../../redux/actions";
import { addFavorite, deleteFavorite, fetchData } from "../../views/Favorites/funcionesFav";
import {cache} from '../../components/NavBar/NavBar'


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


    const { getIdTokenClaims } = useAuth0();

    //Para guardar el userId
    const [userId, setUserId] = useState(null);


  //favoritos
  const [isFavorite, setIsFavorite] = useState(false);

  // Carrito
  const [isInCart, setIsInCart] = useState(false);


    const getUserId = async () => {
      try {
        const tokenClaims = await getIdTokenClaims();
        const userIdFromCache = cache.get("userId");
    
        if (userIdFromCache) {
          setUserId(userIdFromCache);
          return userIdFromCache;
        } else if (tokenClaims && tokenClaims.sub) {
          const userId = tokenClaims.sub;
          cache.set("userId", userId);
          setUserId(userId);
          return userId;
        }
      } catch (error) {
        console.error("Error al obtener los claims del token de identificación:", error);
      }
    
      return null;
    };

    useEffect(() => {
      getUserId();
    }, []);

    // Verificar si el producto está en el carrito
    const cartProducts = useSelector(state => state.cart);
    if (cartProducts) {
        cartProducts.forEach(product => {
            if (product.id === id) {
                setIsInCart(true);
            }
        });

    }
  }, [user]);

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
      parsedCartProducts.push(productToAdd);
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
    if (user) {
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
    }
  }, [userId, id]);


    //verificar si el producto esta en favoritos
    const checkFavoriteStatus = async () => {
      if(userId){
        try {
          // Llamar a la función fetchData para obtener los productos favoritos del usuario
          const favoriteProducts = await fetchData(userId);
          if(!favoriteProducts.message){
            // Verificar si el producto actual está en la lista de productos favoritos
            const isProductFavorite = favoriteProducts.some((p) => p.id === id);
            setIsFavorite(isProductFavorite);
          };
        } catch (error) {
          console.error(error);
        }
      }else{
        setIsFavorite(false)
      }
    };

    useEffect(() => {
      checkFavoriteStatus();
    }, [userId, id]);

    const addToFavorites = async () => {
        if(!userId){
            alert('Debes iniciar sesión para agregar a favoritos')
        }else{
            const body = { productId: id, userId: userId }; // Crea un objeto con productId y userId
            try {
              await addFavorite(body);
              setIsFavorite(true);
            } catch (error) {
              console.error('Error al agregar a favoritos:', error);
            }
        }
    };

    const removeFromFavorites = async () => {
      try {
        await deleteFavorite(id, userId);
        setIsFavorite(false);
        alert('Producto eliminado de favoritos!');
        window.location.reload();
      } catch (error) {
        console.error('Error al eliminar de favoritos:', error);
      }
    };

    return (
        <div className={style.card}>
         <NavLink to={`/product/${id}`} style={{textDecoration:'none'}}>
            <img className={style.image} src={imageSrc} alt="" />
            <div className={style.detailCard}>
                <h1>${price}</h1>
                <h3 key={id}>{name}</h3>
                {/* <p>Rating: {rating}</p> */}
            </div>
         </NavLink>
         <button className={style.cartButton} onClick={isInCart ? removeFromCartHandler : addToCartHandler}>
            {isInCart ? "Eliminar del carrito" : "Agregar al carrito"}
        </button>
         {isFavorite ? <button className={style.fav} onClick={removeFromFavorites}>❤️</button> : <button className={style.fav} onClick={addToFavorites}>🤍</button>}

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

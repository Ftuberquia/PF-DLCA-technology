import React from "react";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { addFavorite, deleteFavorite, fetchData } from "../../views/Favorites/funcionesFav";

import axios from "axios";

import style from "./Card.module.css";
import Swal from "sweetalert2";

const Card = ({id,name,imageSrc,price,rating,stock}) => {

  //Para guardar el userId
  const [userId, setUserId] = useState(null);

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
 
  const checkCart=async()=>{
    if (userId === null) {
      const storedCartProducts = localStorage.getItem("cartProducts");
      const parsedCartProducts = storedCartProducts
        ? JSON.parse(storedCartProducts)
        : [];
      // Buscar si ya existe un producto con el mismo 'id' en el carrito
      const existingProductIndex = parsedCartProducts.findIndex(
        (item) => item.id === id
      );
      if (existingProductIndex !== -1) {
        // Si el producto ya existe en el carrito
        setIsInCart(existingProductIndex)
      }else setIsInCart(false)
    } else if(userId!==null){
      try {
        const response = await axios.get(`carts/${userId}`)
        const data= await response.data
        let productInCart=data[1].some((prod)=>prod.productId===id)
        if(productInCart){
          setIsInCart(true)
        }else{
          setIsInCart(false)
        }
      } catch (error) {
        console.error("Error en el front al revisar el carrito", error);
      }
    }
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
        quantity:1
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
      try {
        const body={quantity_prod:1}
        const response = await axios.post(`carts/${userId}/${id}`,body)
        const data= await response.data
        if(data.message==="producto agregado al carrito"){
          setIsInCart(true)
        }
      } catch (error) {
        console.error("Error en el front al agregar al carrito", error);
      }
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
      const response = await axios.delete(`carts/${id}/${userId}`);
      const status = response.status;
      if (status === 200){
        alert("Producto eliminado del carrito");
        setIsInCart(false); // Establece el estado como "no en el carrito"
      }
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
    checkCart();
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
      // alert("Producto eliminado de favoritos!");
      Swal.fire({
        title: "Desea eliminar su producto de favoritos?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, estoy seguro",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#ff0000",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(removeFromFavorites(id, userId));
        }
      });
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

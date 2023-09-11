import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import { fetchData } from "./funcionesFav";
import Cards from "../../components/Cards/Cards";
import { cache } from "../../components/NavBar/NavBar";

import style from './FavoritesProducts.module.css'

export default function Favorites() {
  const history = useHistory();
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const {isLoading, getIdTokenClaims} = useAuth0();
  const [userId, setUserId] = useState(null);

  const getUserId = async () =>{
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
    }   catch (error) {
      console.error("Error al obtener los claims del token de identificación:", error);
    }
    return null;
  }

  useEffect(()=>{
    getUserId();
  },[])

  const fetchFavoriteProducts = async () => {
    if (userId !==null) {
      const productsPromise = fetchData(userId);
      const response = await productsPromise;

      if (Array.isArray(response)) {
        setFavoriteProducts(response);
      } else {
        setErrorMessage(response.message);
      }
    }else {
      alert("Ingresa o registrate para ver tus favoritos!");
      history.goBack();
    }
  };

  useEffect(() => {
    if (userId !== null) {
      fetchFavoriteProducts();
    }
  }, [userId, history]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className={style.favoritesCont}>
      <h1>Favoritos</h1>
      {errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <Cards products={favoriteProducts} />
      )}
    </div>
  );
}
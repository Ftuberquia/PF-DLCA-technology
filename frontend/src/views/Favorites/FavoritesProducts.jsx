import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchData } from "./funcionesFav";

import Cards from "../../components/Cards/Cards";

import style from './FavoritesProducts.module.css'

export default function Favorites() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [userId, setUserId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const { user } = useAuth0();

  useEffect(() => {
    if (user) {
      setUserId(user.sub)
    } else {
      alert("Ingresa o registrate para ver tus favoritos!");
      history.goBack();
    }
  }, [user, history, dispatch]);

  useEffect(()=>{
    const fetchFavoriteProducts = async () => {
      if (userId !== null) {
        const productsPromise = fetchData(userId);
        const response = await productsPromise;
  
        if (Array.isArray(response)) {
          setFavoriteProducts(response);
        } else {
          setErrorMessage(response.message);
        }
      }
    };
    fetchFavoriteProducts();
  },[userId])

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
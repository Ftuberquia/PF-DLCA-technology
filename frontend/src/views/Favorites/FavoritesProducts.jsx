import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchData } from "./funcionesFav";

import Cards from "../../components/Cards/Cards";

import style from './FavoritesProducts.module.css'

export default function Favorites() {
  const history = useHistory();
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const { user, isAuthenticated, isLoading } = useAuth0();

  
  useEffect(() => {
    if (isAuthenticated) {
      const userId=user.sub
      const fetchFavoriteProducts = async () => {
        if (userId !== null) {
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
      fetchFavoriteProducts();
    }else{
      setErrorMessage('Necesitas loguearte o registrarte!');
    } 
  }, [user, history]);

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
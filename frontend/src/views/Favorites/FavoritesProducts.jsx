import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import { fetchData } from "./funcionesFav";
import Cards from "../../components/Cards/Cards";
import { cache } from "../../components/NavBar/NavBar";

import style from './FavoritesProducts.module.css'
import Loading from "../../components/Loading/Loading";


export default function Favorites() {
  const history = useHistory();
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  const { user, isAuthenticated } = useAuth0();
  const [userId, setUserId] = useState(null);

  const userIdFromCache = cache.get("userId");
  
  const getUserId = () => {
    if(isAuthenticated){
      if (userIdFromCache) {
        setUserId(userIdFromCache);
        return userIdFromCache;
      } else if (user && user.sub) {
        const userId = user.sub;
        cache.set("userId", userId);
        setUserId(userId);
        return userId;
      }}
    return null;
  };

  useEffect(()=>{
    getUserId();
    // eslint-disable-next-line
  },[])

  const fetchFavoriteProducts = async () => {
    if (isAuthenticated) {
      if(userId){
        const productsPromise = await fetchData(userId);
        const response = await productsPromise;

        if (Array.isArray(response)) {  
          setFavoriteProducts(response);
        } 
      }
    }else{
      alert("Ingresa o registrate para ver tus favoritos!");
      history.goBack();
    }
  };

  useEffect(() => {
    fetchFavoriteProducts();
  }, [userId,isAuthenticated, history]);

  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    // Establecer isLoading en falso después de 2 segundos
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <div className={style.loadingContainer}>
          <Loading />
        </div>
      ) : (
    <div className={style.favoritesCont}>
      <h1>Favoritos</h1>
      
        <Cards products={favoriteProducts} />
      
    </div>
    )}
   </>
  )
};
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import { fetchData } from "./funcionesFav";
import Loading from "../../components/Loading/Loading";
import Contenedor from "./Contenedor/Contenedor";

import style from "./FavoritesProducts.module.css";

export default function Favorites() {
  const history = useHistory();
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  const { user, isAuthenticated } = useAuth0();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (isAuthenticated && user) {
      const userIdLogin = user.sub;
      setUserId(userIdLogin);
    }
  }, [isAuthenticated, user]);

  const fetchFavoriteProducts = async () => {
      if (userId) {
        const productsPromise = await fetchData(userId);
        const response = await productsPromise;

        if (Array.isArray(response)) {
          setFavoriteProducts(response);
        }
      }
  };

  function deleteFav(idProd){
    setFavoriteProducts(favoriteProducts.filter(e=>e.id!==idProd))
  }

  useEffect(() => {
    fetchFavoriteProducts();
    
    // eslint-disable-next-line
  }, [userId, isAuthenticated, history]);

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
          <h1>Favoritos ❤️</h1>
          <Contenedor products={favoriteProducts} userId={userId} setFavoriteProducts={deleteFav}/>
        </div>
      )}
    </>
  );
}

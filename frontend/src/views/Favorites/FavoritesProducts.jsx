import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchData } from "./funcionesFav";

import Cards from "../../components/Cards/Cards";

import style from './FavoritesProducts.module.css'

export default function Favorites() {
    const dispatch = useDispatch();
    const history=useHistory();
    const [favoriteProducts, setFavoriteProducts]=useState([]);

    let { user } = useAuth0(); // Obtener la información del usuario actual desde Auth0

    //hardcodeo cambiar despues
    if(!user) user=1;

    useEffect(() => {
        const fetchFavoriteProducts = async () => {
          if (user) {
            try {
              const productsPromise = fetchData(user);
              const products = await productsPromise;
              setFavoriteProducts(products);
            } catch (error) {
              // Manejar el error en caso de que la solicitud falle
              console.error(error);
            }
          } else {
            alert("Ingresa o registrate para ver tus favoritos!");
            history.goBack();
          }
        };
        fetchFavoriteProducts();
        // eslint-disable-next-line
      }, [user, history, dispatch]);

    return (
        <div className={style.favoritesCont}>
            <h1>Favoritos</h1>
            <Cards products={favoriteProducts}/>
        </div>
    );
}
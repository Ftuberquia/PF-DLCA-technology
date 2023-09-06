import React, { useEffect, useState } from "react";
import Cards from "../../components/Cards/Cards";
import axios from "axios";

export default function Favorites() {

    const [favoriteProducts, setFavoriteProducts] = useState([]);

    const userId=1

    useEffect(() => {
      axios.get(`/favorites/${userId}`)
        .then(response => {
            console.log('esta es la data de la DB',response.data)
            const products = response.data.rows[0].products;
          setFavoriteProducts(products);
          console.log('esta es la data de solo los productos',products)
        })
        .catch(error => {
          console.error('Error al obtener los productos favoritos:', error);
        });
    }, [userId]);

    

    return (
        <div>
            <h1>Favorites</h1>
            <Cards products={favoriteProducts}/>
        </div>
    )
}
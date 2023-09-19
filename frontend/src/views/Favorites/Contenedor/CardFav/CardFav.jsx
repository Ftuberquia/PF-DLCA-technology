import React from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";

import { deleteFavorite} from "../../funcionesFav";


import style from './CardFav.module.css'
const CardFav = (props) => {
    const { id, name, imageSrc, price, userId, setFavoriteProducts } = props

    //favoritos
    const [isFavorite, setIsFavorite] = useState(true);

    const removeFromFavorites = async () => {
        try {
            await deleteFavorite(id, userId);
            setIsFavorite(false);
            alert("Producto eliminado de favoritos!");
            setFavoriteProducts(id)
        } catch (error) {
            console.error("Error al eliminar de favoritos:", error);
        }
    };

    return (
      <div className={style.product}>
        <div className={style.card}>
        <NavLink to={`/product/${id}`} style={{ textDecoration: "none" }}>
            <div className={style.detailCard}>
            <img className={style.image} src={imageSrc} alt="" />
            <h3 key={id}>{name}</h3>
            <h1>${price}</h1>
            </div>
        </NavLink>
        {/* <button
            className={style.cartButton}
            onClick={isInCart ? removeFromCartHandler : addToCartHandler}
        >
            {isInCart ? "Eliminar del carrito" : "Agregar al carrito"}
        </button> */}
        {isFavorite ? (
            <button className={style.fav} onClick={removeFromFavorites}>
            ❤️
            </button>
        ) : (
            <button className={style.fav}>
            🤍
            </button>
        )}
        </div>
      </div>
    );
};

export default CardFav;
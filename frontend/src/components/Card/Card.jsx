import React from "react";
import { NavLink } from "react-router-dom";

import style from './Card.module.css'

const Card = ({ id, name, imageSrc, price, rating, stock, disabled, addToCart }) => {

    const handleAddToCart = () => {
        if (!disabled) {
            addToCart({
                id,
                name,
                imageSrc,
                price,
                rating,
                stock
            });
            alert(`${name} ha sido agregado al carrito.`)
        }
    };

    return (
        <div className={style.card}>
         <NavLink to={`/product/${id}`} style={{textDecoration:'none'}}>
            <img className={style.image} src={imageSrc} alt="" />
            <div className={style.detailCard}>
                <p key={id}>{name}</p>
                <p>${price}</p>
                <p>Rating: {rating}</p>
            {/* <p>Stock: {stock}</p> */}
            </div>
         </NavLink>
         <button onClick={handleAddToCart}>Agregar al carrito</button>
        </div>
    )
};

export default Card;
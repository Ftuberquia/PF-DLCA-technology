import React from "react";
import { Link } from "react-router-dom";

const Card = ({ id, name, imageSrc, price, rating, stock, disabled }) => {

    return (
        <div>
            <img src={imageSrc} alt="" />
            <Link to={`/product/${id}`}>
            <h2>Ver más</h2>
            </Link>
            <p>{name}</p>
            <p>Precio: {price}</p>
            <p>Rating: {rating}</p>
            <p>Stock: {stock}</p>
        </div>
    )
};

export default Card;
import React from "react";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import style from './Card.module.css'
import { addFavorite, deleteFavorite } from "../../redux/actions";

const Card = ({ id, name, imageSrc, price, rating, stock, disabled, addToCart }) => {
    //carrito
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
    
    //favoritos
    const [isFavorite, setIsFavorite] = useState(false)

    //Para obtener el userId desde el localStorage
    const [userId, setUserId] = useState(null);
    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        setUserId(storedUserId);
    }, []);

    //verificar si el producto esta en favoritos
    const favoriteProducts=useSelector(state=>state.favs)
    if(favoriteProducts){
        favoriteProducts.forEach(product => {
            if(product.id === id){
                setIsFavorite(true)
            }
        })
    }
    
    const addToFavorites = async () => {
        if(userId===null){
            //alert('Debes iniciar sesión para agregar a favoritos')
            
            //almacenar en el localStorage
            const productToAdd={
                id,
                name,
                imageSrc,
                price,
                rating,
            }
            const storedFavProducts = localStorage.getItem("favProducts");
            // Verificar si hay productos en el carrito en el localStorage
            const parsedFavProducts = storedFavProducts ? JSON.parse(storedFavProducts) : [];
            parsedFavProducts.push(productToAdd)
            localStorage.setItem("favProducts", JSON.stringify(parsedFavProducts));
            setIsFavorite(true);
        }else{
            const body = { productId: id, userId: userId }; // Crea un objeto con productId y userId
            addFavorite(body)
            setIsFavorite(true);
        }
    };

    const removeFromFavorites = async () => {
        if(userId===null){
            const storedFavProducts=localStorage.getItem('favProducts')
            const parsedFavProducts = storedFavProducts ? JSON.parse(storedFavProducts) : []
            const index = parsedFavProducts.findIndex(product => product.id === id)
            parsedFavProducts.splice(index, 1)
            localStorage.setItem('favProducts', JSON.stringify(parsedFavProducts))
            setIsFavorite(false);
            alert('Producto eliminado de favoritos!')
        }else{
            deleteFavorite(id,userId)
            setIsFavorite(false);
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
         {isFavorite ? <button className={style.fav} onClick={removeFromFavorites}>❤️</button> : <button className={style.fav} onClick={addToFavorites}>🤍</button>}
        </div>
    )
};

export default Card;
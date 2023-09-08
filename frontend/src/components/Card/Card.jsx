import React from "react";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import style from './Card.module.css'
import { addFavorite, deleteFavorite, addToCart, removeFromCart } from "../../redux/actions";

const Card = ({ id, name, imageSrc, price, rating, stock, disabled }) => {
    const dispatch = useDispatch();

    //favoritos
    const [isFavorite, setIsFavorite] = useState(false)

    // Carrito
    const [isInCart, setIsInCart] = useState(false);

    //Para obtener el userId desde el localStorage
    const [userId, setUserId] = useState(null);
    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        setUserId(storedUserId);
    }, []);

    // Verificar si el producto está en el carrito
    const cartProducts = useSelector(state => state.cart);
    if (cartProducts) {
        cartProducts.forEach(product => {
            if (product.id === id) {
                setIsInCart(true);
            }
        });
    }

    const addToCartHandler = async () => {
        if (userId === null) {
            // Almacena en el localStorage
            const productToAdd = {
                id,
                name,
                imageSrc,
                price,
                rating,
                stock,
            };
            const storedCartProducts = localStorage.getItem("cartProducts");
            const parsedCartProducts = storedCartProducts ? JSON.parse(storedCartProducts) : [];
            parsedCartProducts.push(productToAdd);
            localStorage.setItem("cartProducts", JSON.stringify(parsedCartProducts));
            setIsInCart(true); // Establece el estado como "en el carrito"
        } else {
            // Usa Redux para agregar el producto al carrito
            dispatch(addToCart({
                id,
                name,
                imageSrc,
                price,
                rating,
                stock,
            }));
            setIsInCart(true); // Establece el estado como "en el carrito"
        }
    };

    const removeFromCartHandler = async () => {
        if (userId === null) {
          // Remueve el producto del carrito en el localStorage
          const storedCartProducts = localStorage.getItem("cartProducts");
          const parsedCartProducts = storedCartProducts ? JSON.parse(storedCartProducts) : [];
      
          // Encuentra el índice del producto en el carrito
          const index = parsedCartProducts.findIndex(product => product.id === id);
      
          if (index !== -1) {
            parsedCartProducts.splice(index, 1); // Elimina el producto del carrito
            localStorage.setItem("cartProducts", JSON.stringify(parsedCartProducts));
            setIsInCart(false); // Establece el estado como "no en el carrito"
            alert('Producto eliminado del carrito');
          }
        } else {
          // Usa Redux para eliminar el producto del carrito
          dispatch(removeFromCart(id));
          setIsInCart(false); // Establece el estado como "no en el carrito"
        }
      };

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
            alert('Producto eliminado de favoritos!')
        }
    };

    return (
        <div className={style.card}>
         <NavLink to={`/product/${id}`} style={{textDecoration:'none'}}>
            <img className={style.image} src={imageSrc} alt="" />
            <div className={style.detailCard}>
                <h1>${price}</h1>
                <h3 key={id}>{name}</h3>
                {/* <p>Rating: {rating}</p> */}
            </div>
         </NavLink>
         <button className={style.cartButton} onClick={isInCart ? removeFromCartHandler : addToCartHandler}>
            {isInCart ? "Eliminar del carrito" : "Agregar al carrito"}
        </button>
         {isFavorite ? <button className={style.fav} onClick={removeFromFavorites}>❤️</button> : <button className={style.fav} onClick={addToFavorites}>🤍</button>}
        </div>
    )
};

export default Card;
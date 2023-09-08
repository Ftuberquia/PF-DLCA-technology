import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"; 
import { getProductDetail, cleanDetail, addToCart } from "../../redux/actions/index";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";

import { addFavorite, deleteFavorite, fetchData } from "../../views/Favorites/funcionesFav";

import style from './ProductDetail.module.css'

const ProductDetail = () => {
    const { id } = useParams(); 

    const product = useSelector(state => state.productDetail);
    const [isFavorite, setIsFavorite] = useState(false)
    let [userId, setUserId] = useState(null);

    const dispatch = useDispatch();
   
    useEffect(() => {
        dispatch(getProductDetail(id))
        return() =>{
            dispatch(cleanDetail())
        }
    }, [dispatch, id])
    
    //Para obtener el userId desde el localStorage
    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        setUserId(storedUserId);
    }, []);

    //verificar si el producto esta en favoritos
    useEffect(() => {
        // eslint-disable-next-line
        userId=1    //sacar esto cuando termine de funcionar lo del user
        const checkFavoriteStatus = async () => {
          try {
            // Llamar a la función fetchData para obtener los productos favoritos del usuario
            const favoriteProducts = await fetchData(userId);
            // Verificar si el producto actual está en la lista de productos favoritos
            const isProductFavorite = favoriteProducts.some((product) => product.id === id);
            if(isProductFavorite)setIsFavorite(true);
          } catch (error) {
            console.error(error);
          }
        };
        checkFavoriteStatus();
      }, [userId, id]);

    const addToFavorites = async () => {
        userId=1    //sacar esto cuando termine de funcionar lo del user
        if(userId===null){
            alert('Debes iniciar sesión para agregar a favoritos')
        }else{
            const body = { productId: id, userId: userId }; // Crea un objeto con productId y userId
            addFavorite(body)
                .then(()=>{
                    setIsFavorite(true);
                })
                .catch((error)=>console.log(error))
        }
    };

    const removeFromFavorites = async () => {
        userId=1    //sacar esto cuando termine de funcionar lo del user
        deleteFavorite(id, userId)
            .then(() => {
                setIsFavorite(false);
                alert('Producto eliminado de favoritos!');
            })
        .catch((error) => {
            console.error(error);
        });
    };

    if (!product) {
        return <div>Cargando...</div>;
    }

    const handleAddToCart = () => {
        dispatch(addToCart(product));
        alert(`${product.name} ha sido agregado al carrito.`);
      };
    
    const handleBuyNow = () => {
        // Comprar el producto ahora
      };

    return (
        <div className={style.conteiner}>
            <div className={style.contNavCat}>
                <Link to={'/productos'} className={style.volver}>← Volver al listado</Link>
                <p>{product.category}</p>
                <p>{'>'}</p>
                <p>{product.subcategory}</p>
            </div>
            <hr/>
            <div className={style.contProducto}>
                <div className={style.detalles1}>
                 <h1>{product.name}</h1>
                 <h3>Marca: {product.brand}</h3>
                 {isFavorite ? <button className={style.fav} onClick={removeFromFavorites}>❤️</button> : <button className={style.fav} onClick={addToFavorites}>🤍</button>}
                 <img src={product.imageSrc} alt={product.imageAlt}/>
                 <hr/>
                 <div className={style.detalles2}>
                    <h2>Descripción</h2>
                    <p>{product.description}</p>
                 </div>
                </div>
                <div className={style.infoCompra}>
                 <h2>$ {product.price}</h2>
                 <div className={style.cantidad}>
                     <button>-</button>
                     <p>1</p>
                     <button>+</button>
                 </div>
                 <button className={style.agregarCarrito} onClick={handleAddToCart}>Agregar al carrito</button>
                 <button className={style.comprar} onClick={handleBuyNow}>Comprar ahora</button>
                </div>
            </div>
            

            {/* <form>
                <label htmlFor="comment">Comentario:</label>
                <textarea id="comment" name="comment" />
                <button type="submit">Enviar comentario</button>
            </form>
            <div className="rating">
                <span className="star">&#9733;</span>
                <span className="star">&#9733;</span>
                <span className="star">&#9733;</span>
                <span className="star">&#9734;</span>
                <span className="star">&#9734;</span>
                <p>Calificación promedio: 3 estrellas</p>
            </div> */}
        </div>
    );
};

export default ProductDetail;



import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"; 
import { getProductDetail } from "../../redux/actions/index";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import style from './ProductDetail.module.css'

const ProductDetail = () => {
    const { id } = useParams(); 

    const product = useSelector(state => state.productDetail);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductDetail(id));
    }, [dispatch, id])

    if (!product) {
        return <div>Cargando...</div>;
    }

    const handleAddToCart = () => {
        // Agregar el producto al carrito
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
                 <h5>ID: {product.id}</h5>
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



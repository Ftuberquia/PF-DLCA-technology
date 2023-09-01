import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"; 
import { getProductDetail } from "../../redux/actions";
import { useParams } from "react-router-dom";

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
        <div>
            <h2>Detalles del producto</h2>
            <p>ID: {product.id}</p>
            <p>Nombre: {product.name}</p>
            <p>Precio: {product.price}</p>
            <p>Href: {product.href}</p>
            <p>Imagen: <img src={product.imageSrc} alt={product.imageAlt} /></p>
            <p>Stock: {product.stock}</p>
            <p>Marca: {product.brand}</p>
            <p>Categoría: {product.category}</p>
            <p>Subcategoría: {product.subcategory}</p>
            <p>Descripción: {product.description}</p>

            <button onClick={handleAddToCart}>Agregar al carrito</button>
            <button onClick={handleBuyNow}>Comprar ahora</button>

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



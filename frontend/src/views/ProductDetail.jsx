import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"; 
import { getProductDetail } from "../redux/actions";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
    const { id } = useParams(); 
    console.log(id);

    const product = useSelector(state => state.productDetail);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductDetail(id));
    }, [dispatch, id])

    if (!product) {
        return <div>Cargando...</div>;
    }

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
        </div>
    );
};

export default ProductDetail;



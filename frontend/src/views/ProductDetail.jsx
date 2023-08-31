import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"; // Importa useSelector desde react-redux para acceder al estado global
import { getProductDetail } from "../redux/actions";

const ProductDetail = (props) => {
    const { match } = props;
    const productId = match.params.id;

    const product = useSelector(state => state.productDetail);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductDetail(productId));
    }, [dispatch, productId])

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



import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductDetail = (props) => {
    const { match } = props;
    const productId = match.params.id; 

    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/products/${productId}`); // Ajusta la URL según tu configuración
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [productId]);

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


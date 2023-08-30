import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductDetail = (props) => {
    const productId = props.match.params.productId;
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
          try {
            const response = await axios.get(`/api/productos/${productId}`); // aun esta a prueba este enlace
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
        </div>
    )
};

export default ProductDetail;
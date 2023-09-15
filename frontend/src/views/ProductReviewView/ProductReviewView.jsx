import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { getPurchasedProducts } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const ProductReviewView = () => {
    const dispatch = useDispatch();
    const purchasedProducts = useSelector((state) => state.purchasedProducts)
    const { isAuthenticated } = useAuth0();

    useEffect(() => {
        dispatch(getPurchasedProducts());
      }, [dispatch]);

  return (
<div>
      {isAuthenticated ? (
        <div>
          <h1> Productos Comprados </h1>
          {purchasedProducts.length === 0 ? (
            <p>No has comprado ningún producto aún.</p>
          ) : (
            <ul>
              {purchasedProducts.map((product) => (
                <li key={product.id}>
                  <h2>{product.name}</h2>
                  <p>Precio: {product.price}</p>
                  <p>Descripción: {product.description}</p>
                  {/* Agrega más detalles del producto aquí si es necesario */}
                  {/* Agrega un formulario para agregar una revisión */}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <p>Debes iniciar sesión para ver tus productos comprados.</p>
      )}
    </div>
  );
};

export default ProductReviewView;
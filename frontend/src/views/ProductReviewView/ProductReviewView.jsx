import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { getPurchasedProducts } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ProductReviewView = () => {
    const dispatch = useDispatch();
    const purchasedProducts = useSelector((state) => state.purchasedProducts)
    const { isAuthenticated, user } = useAuth0();

    useEffect(() => {
        dispatch(getPurchasedProducts());
      }, [dispatch]);

      const [formData, setFormData] = useState({
        comment: '',
        rating: 1, // Valor predeterminado para la calificación
      });

      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
      };

      const handleSubmitReview = async (event) => {
        event.preventDefault();
      
        try {
          for (const product of purchasedProducts) {
            const reviewData = {
              userId: user.sub,
              productId: product.id,
              comment: formData.comment,
              rating: formData.rating,
            };
            await axios.post(`http://localhost:3001/reviews/${product.id}`, reviewData);
          }
          window.alert('Gracias por reseñar el producto!')
        } catch (error) {
          console.log(error.message);
        }
      };

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

                  <form onSubmit={handleSubmitReview}>
                    <label>
                      Comentario:
                      <textarea
                        name="comment"
                        value={formData.comment}
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      Calificación:
                      <input
                        type="number"
                        name="rating"
                        min="1"
                        max="5"
                        value={formData.rating}
                        onChange={handleChange}
                      />
                    </label>
                    <button type="submit">Enviar reseña</button>
                  </form>

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
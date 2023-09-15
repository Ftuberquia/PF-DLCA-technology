import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const MisComprasView = () => {
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    const fetchPurchasedProducts = async () => {
      try {
        const response = await axios.get('tu_endpoint'); // aqui el GET al endpoint para obtener los productos comprados por el usuario 
        setPurchasedProducts(response.data);
      } catch (error) {
        console.error('Error al obtener los productos comprados', error);
      }
    };
    fetchPurchasedProducts();
  }, []);

  const [formData, setFormData] = useState({
    comment: '',
    rating: 1,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitReview = async (event, productId) => {
    event.preventDefault();
    try {
      const reviewData = {
        userId: user.sub,
        productId,
        comment: formData.comment,
        rating: formData.rating,
      };
      await axios.post(`http://localhost:3001/reviews/${productId}`, reviewData);

      // Mostrar una alerta o mensaje de éxito aquí si lo deseas
      window.alert("Reseña agregada al producto")
      // Actualizar la información de la reseña en el estado local si lo deseas
      const updatedProducts = purchasedProducts.map((product) => {
        if (product.id === productId) {
          return { ...product, review: reviewData };
        }
        return product;
      });
      setPurchasedProducts(updatedProducts);
    } catch (error) {
      console.log('Error al enviar la reseña', error);
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <h1>Productos Comprados</h1>
          {purchasedProducts.length === 0 ? (
            <p>No has comprado ningún producto aún.</p>
          ) : (
            <ul>
              {purchasedProducts.map((product) => (
                <li key={product.id}>
                  <h2>{product.name}</h2>
                  <p>Precio: {product.price}</p>
                  <p>Descripción: {product.description}</p>

                  {product.review ? (
                    <div>
                      <p>Tu reseña:</p>
                      <p>Comentario: {product.review.comment}</p>
                      <p>Calificación: {product.review.rating}</p>
                    </div>
                  ) : (
                    <form onSubmit={(e) => handleSubmitReview(e, product.id)}>
                      <h3>Deseas dar una reseña a este producto?</h3>
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
                        <select
                          name="rating"
                          value={formData.rating}
                          onChange={handleChange}>
                          {[1, 2, 3, 4, 5].map((value) => (
                            <option key={value} value={value}>
                              {value}
                            </option>
                          ))}
                        </select>
                      </label>
                      <button type="submit">Enviar reseña</button>
                    </form>
                  )}
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

export default MisComprasView;

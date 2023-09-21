import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const AgregarResena = (props) => {
  const { productId } = props.location.state
  const { isAuthenticated, user, isLoading } = useAuth0();
  const history = useHistory();

  const [formData, setFormData] = useState({
    comment: '',
    rating: 1,
  });
  const [reviewCreated, setReviewCreated] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitReview = async (event) => {
    event.preventDefault();
    try {
      const reviewData = {
        userId: isAuthenticated ? user.sub : null,
        productId: productId,
        comment: formData.comment,
        rating: parseInt(formData.rating),
        userEmail: isAuthenticated ? user.email : null,
      };

      await axios.post(`/reviews/${productId}`, reviewData);

      // Mostrar confirmación de reseña creada
      setReviewCreated(true);
    } catch (error) {
      console.error('Error al enviar la reseña', error);
    }
  };

  const volverAMisCompras = () => {
    history.push(`/misCompras`);
  };

  return (
    <div>
      <h1>Agregar Reseña</h1>
      {reviewCreated ? (
        <div>
          <p>Reseña creada con éxito.</p>
          <button onClick={() => setReviewCreated(false)}>Volver</button>
        </div>
      ) : (
        <form onSubmit={handleSubmitReview}>
          <div>
            <label>
              Comentario:
              <textarea name="comment" value={formData.comment} onChange={handleChange} />
            </label>
          </div>
          <div>
            <label>
              Calificación:
              <select name="rating" value={formData.rating} onChange={handleChange}>
                {[1, 2, 3, 4, 5].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <button type="submit">Enviar Reseña</button>
        </form>
      )}
      <button onClick={volverAMisCompras}>Volver a tus compras</button>
    </div>
  );
};

export default AgregarResena;



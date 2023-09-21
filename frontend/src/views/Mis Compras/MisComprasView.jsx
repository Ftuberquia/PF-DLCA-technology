import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import styles from './MisComprasView.module.css';
import { useHistory } from 'react-router-dom';

const MisComprasView = () => {
  const { isAuthenticated, user, isLoading } = useAuth0();
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  const history = useHistory();

  const fetchPurchasedProducts = async () => {
    if (!isAuthenticated || isLoading) {
      return;
    }

    const userId = user?.sub;
    try {
      const response = await axios.get(`http://localhost:3001/purchase/${userId}`);
      setPurchasedProducts(response.data);
    } catch (error) {
      console.error('Error al obtener los productos comprados', error);
    }
  };

  useEffect(() => {
    fetchPurchasedProducts();
  }, [isAuthenticated, isLoading, user]);

  const handleAddReview = async (productId) => {
    history.push(`/agregarResena`, { productId });
  };

  // Función para manejar la actualización de las reseñas después de agregar una
  const handleReviewAdded = () => {
    fetchPurchasedProducts();  // Recarga los productos después de agregar una reseña
  };

  return (
    <div>
      <h1 className={styles.productHeading}>Mis Compras</h1>
      <ul>
        {purchasedProducts.map((purchase, index) => (
          <li key={index} className={styles.productItem}>
            <h2 className={styles.productName}>{purchase.product.name}</h2>
            <img src={purchase.product.imageSrc} alt={purchase.product.imageAlt} className={styles.productImage} />
            <p className={styles.productPrice}>Precio: ${purchase.product.price}</p>

            {purchase.reviews.length > 0 ? (
              <div className={styles.productReview}>
                <p>Tu reseña:</p>
                <p>Comentario: {purchase.reviews[0].comment}</p>
                <p>Calificación: {purchase.reviews[0].rating}</p>
              </div>
            ) : (
              <button className={styles.addReviewButton} onClick={() => handleAddReview(purchase.productId)}>Agregar Reseña</button>
            )}
          </li>
        ))}
      </ul>
      {/* Agrega un botón para recargar los productos (opcional) */}
      <button onClick={fetchPurchasedProducts}>Recargar Productos</button>
    </div>
  );
};

export default MisComprasView;






import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import styles from './MisComprasView.module.css';
import Loading from '../../components/Loading/Loading';

const MisComprasView = () => {
  const { isAuthenticated, user, isLoading } = useAuth0();
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  const [formData, setFormData] = useState({
    comment: '',
    rating: 1,
  });
  const [isLoadingTimeout, setIsLoadingTimeout] = useState(true);
  const [renderedProductIds, setRenderedProductIds] = useState(new Set());

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
    const timer = setTimeout(() => {
      setIsLoadingTimeout(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    fetchPurchasedProducts();
  }, [isAuthenticated, isLoading, user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitReview = async (event, productId) => {
    event.preventDefault();
    try {
      const reviewData = {
        userId: user?.sub,
        productId,
        comment: formData.comment,
        rating: formData.rating,
        userEmail: user?.email,
      };
      await axios.post(`http://localhost:3001/reviews/${productId}`, reviewData);

      window.alert('Reseña agregada al producto');

      const updatedProducts = purchasedProducts.map((purchase) => {
        if (purchase.productId === productId) {
          return {
            ...purchase,
            product: {
              ...purchase.product,
              review: reviewData,
            },
          };
        }
        return purchase;
      });
      setPurchasedProducts(updatedProducts);
    } catch (error) {
      console.log('Error al enviar la reseña', error);
    }
  };

  return (
    <>
      {isLoadingTimeout ? (
        <div>
          <Loading />
        </div>
      ) : (
        <div>
          {isAuthenticated ? (
            <div className={styles.comprascontainer}>
              <h1 className={styles.productHeading}>Mis Compras</h1>
              {purchasedProducts.length === 0 ? (
                <p>No has comprado ningún producto aún.</p>
              ) : (
                <ul>
                  {purchasedProducts.map((purchase, index) => {
                    if (renderedProductIds.has(purchase.productId)) {
                      return null; // Product already rendered, skip rendering
                    }
                    renderedProductIds.add(purchase.productId); // Add product to rendered set
                    return (
                      <li key={index} className={styles.productItem}>
                        <h2 className={styles.productName}>{purchase.product.name}</h2>
                        <img src={purchase.product.imageSrc} alt={purchase.product.imageAlt} className={styles.productImage} />
                        <p className={styles.productPrice}>Precio: ${purchase.product.price}</p>

                        {purchase.product.review ? (
                          <div>
                            <p>Tu reseña:</p>
                            <p>Comentario: {purchase.product.review.comment}</p>
                            <p>Calificación: {purchase.product.review.rating}</p>
                          </div>
                        ) : (
                          <form onSubmit={(e) => handleSubmitReview(e, purchase.productId)}>
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
                              <select name="rating" value={formData.rating} onChange={handleChange}>
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
                    );
                  })}
                </ul>
              )}
            </div>
          ) : (
            <p>Debes iniciar sesión para ver tus productos comprados.</p>
          )}
        </div>
      )}
    </>
  );
};

export default MisComprasView;

import React, { useEffect, useState } from "react";
import styles from "./CancelPage.module.css"; // Importa los estilos
import Loading from '../../components/Loading/Loading';
import { useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import emailjs from '@emailjs/browser';
import { useAuth0 } from "@auth0/auth0-react";


const CancelPage = () => {

  const [isLoadingTimeout, setIsLoadingTimeout] = useState(true);

  useEffect(() => {
    // Establecer isLoadingTimeout en falso después de 2 segundos
    const timer = setTimeout(() => {
      setIsLoadingTimeout(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const location = useLocation();
  const canceledProducts = useSelector((state) => state.cart)

  const { user } = useAuth0();
  
  // const sendEmail = () => {

  //   const serviceId = "service_u05znjz"; // Reemplaza con tu ID de servicio
  //   const templateId = "template_c9zye1k"; // Reemplaza con tu ID de plantilla
  //   const userId = "dl6sI5xgzMzAmHsFV"; // Reemplaza con tu ID de usuario

  //   const emailParams = {
  //     from_email: "adlctech01@gmail.com",
  //     to_name: user.given_name,
  //     to_email: user.email,
  //     message: `Compra cancelada. Productos que no se han adquirido:\n${canceledProducts.map((product) => product.name).join('\n')}`
     
  //   };


  //   emailjs.send(serviceId, templateId, emailParams, userId)
  //     .then((response) => {
  //       console.log('Email enviado con éxito:', response);
  //     })
  //     .catch((error) => {
  //       console.error('Error al enviar el email:', error);
  //     });
  // };

  // useEffect(() => {
  //   sendEmail();
  // }, []);


  return (
    <>
      {isLoadingTimeout ? (
        <div className={styles.loadingContainer}>
          <Loading />
        </div>
      ) : (
    <div className={styles.contenedorCancel}>
    <div className={styles["cancel-container"]}>
      <h1 className={styles["cancel-title"]}>Compra Rechazada</h1>
      <h1 className={styles["cancel-mss"]}>Tu compra fue rechazada por falla de Credenciales</h1>

      <div className={styles["cart-items"]}>
          <h2>Compra Cancelada:</h2>
          <ul>
            {canceledProducts.map((product) => (
              <li key={product.id}>{product.name}</li>
            ))}
          </ul>
      </div>
      
      <a href="/productos" className={styles["back-link"]}>
        Volver a Productos
      </a>
      </div>
    </div>
    )}
   </>
  );
};

export default CancelPage;
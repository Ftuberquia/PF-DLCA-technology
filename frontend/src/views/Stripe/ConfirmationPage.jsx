import React from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import styles from "./ConfirmationPage.module.css"; // Importa los estilos
import emailjs from '@emailjs/browser';
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

const ConfirmationPage = () => {

  const location = useLocation();
  const paymentInfo = location.state.paymentInfo;
  const purchasedProducts = useSelector((state) => state.cart)

  const { user } = useAuth0();

   // Imprime los datos en la consola
   console.log("Datos de pago:", paymentInfo);

   const sendEmail = () => {

    const serviceId = "service_u05znjz"; // Reemplaza con tu ID de servicio
    const templateId = "template_c9zye1k"; // Reemplaza con tu ID de plantilla
    const userId = "dl6sI5xgzMzAmHsFV"; // Reemplaza con tu ID de usuario

    const emailParams = {
      from_email: "adlctech01@gmail.com",
      to_name: user.given_name,
      to_email: user.email,
      message: `Productos adquiridos:\n${purchasedProducts.map((product) => product.name).join('\n')}`,
    };

    emailjs.send(serviceId, templateId, emailParams, userId)
      .then((response) => {
        console.log('Email enviado con éxito:', response);
      })
      .catch((error) => {
        console.error('Error al enviar el email:', error);
      });
  };

  useEffect(() => {
    sendEmail();
  }, []);


  return (
    <div className={styles.contenedorConfirm}>
      <div className={styles["confirmation-container"]}>
      <h1 className={styles["confirmation-title"]}>Compra Exitosa</h1>

      <div className={styles["payment-info"]}>
        <p>ID de Pago: {paymentInfo.payment.id}</p>
        <p>Monto: ${paymentInfo.payment.amount}</p>
      </div>

      <div className={styles["cart-items"]}>
          <h2>Productos adquiridos:</h2>
          <ul>
            {purchasedProducts.map((product) => (
              <li key={product.id}>{product.name}</li>
            ))}
          </ul>
        </div>

      <a href="/productos" className={styles["back-link"]}>
        Volver a Productos
      </a>
    </div>
    </div>
    
  );
};

export default ConfirmationPage;

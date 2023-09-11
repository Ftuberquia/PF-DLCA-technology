import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./ConfirmationPage.module.css"; // Importa los estilos

const ConfirmationPage = () => {
  const location = useLocation();
  const paymentInfo = location.state.paymentInfo;
   // Imprime los datos en la consola
   console.log("Datos de pago:", paymentInfo);


  return (
    <div className={styles.contenedorConfirm}>
      <div className={styles["confirmation-container"]}>
      <h1 className={styles["confirmation-title"]}>Compra Exitosa</h1>

      <div className={styles["payment-info"]}>
        <p>ID de Pago: {paymentInfo.payment.id}</p>
        {/* Agrega otros detalles del pago aquí */}
        <p>Monto: ${paymentInfo.payment.amount}</p>
      </div>

      <a href="/productos" className={styles["back-link"]}>
        Volver a Productos
      </a>
    </div>
    </div>
    
  );
};

export default ConfirmationPage;

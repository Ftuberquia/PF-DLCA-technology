import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./Confirmacion.module.css"; // Importa los estilos

const CancelPage = () => {
  const location = useLocation();
  const paymentInfo = location.state ? location.state.paymentInfo : null;

  return (
    <div className={styles["cancel-container"]}>
      <h1 className={styles["cancel-title"]}>Compra Cancel</h1>

      <a href="/productos" className={styles["back-link"]}>
        Volver a Productos
      </a>
    </div>
  );
};

export default CancelPage;
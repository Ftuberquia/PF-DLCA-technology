import React from "react";
import styles from "./CancelPage.module.css"; // Importa los estilos

const CancelPage = () => {

  return (
    <div className={styles.contenedorCancel}>
    <div className={styles["cancel-container"]}>
      <h1 className={styles["cancel-title"]}>Compra Rechazada</h1>
      <h1 className={styles["cancel-mss"]}>Tu compra fue rechazada por falla de Credenciales</h1>
      <a href="/productos" className={styles["back-link"]}>
        Volver a Productos
      </a>
    </div>
    </div>
  );
};

export default CancelPage;
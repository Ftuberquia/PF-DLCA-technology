import React, { useEffect, useState } from "react";
import styles from "./CancelPage.module.css"; // Importa los estilos
import Loading from '../../components/Loading/Loading';

const CancelPage = () => {

  const [isLoadingTimeout, setIsLoadingTimeout] = useState(true);

  useEffect(() => {
    // Establecer isLoadingTimeout en falso después de 2 segundos
    const timer = setTimeout(() => {
      setIsLoadingTimeout(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

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
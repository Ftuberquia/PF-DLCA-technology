import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./Confirmacion.module.css"; // Importa los estilos

const ConfirmationPage = () => {
    const location = useLocation();
    const { state } = location;
    const paymentInfo = state ? state.paymentInfo : null; 

    return (
        <div className={styles["confirmation-container"]}>
            <h1 className={styles["confirmation-title"]}>Compra Exitosa</h1>

            <div className={styles["payment-info"]}>
                <p>ID de Pago: {paymentInfo ? paymentInfo.paymentIntent.id : ""}</p>
                {/* Agrega otros detalles del pago aquí */}
                <p>Monto: {paymentInfo ? paymentInfo.paymentIntent.amount : ""}</p>
            </div>

            <a href="/productos" className={styles["back-link"]}>Volver a Productos</a>
        </div>
    );
};

export default ConfirmationPage;
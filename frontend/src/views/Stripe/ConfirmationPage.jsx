import React from "react";
import styles from "./ConfirmationPage.module.css"; // Importa los estilos
import { useLocation, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import emailjs from '@emailjs/browser';
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import Loading from '../../components/Loading/Loading';
import { cleanCompra } from "../../redux/actions";
import {cache} from '../../components/NavBar/NavBar';
import axios from "axios";
import { Prev } from "react-bootstrap/esm/PageItem";

const ConfirmationPage = () => {

  const location = useLocation();
  const paymentInfo = location.state.paymentInfo;
  const purchasedProducts = useSelector((state) => state.compra)
  const dispatch = useDispatch();
  const history = useHistory();
  const [nombres,setNombres]=useState([])
  const [stocks,setStocks]=useState([])

  const { user } = useAuth0();

   const handleReturnToProducts = () => {
    // Limpia el carrito
    dispatch(cleanCompra());

    // Redirige a la página de productos
    history.push('/productos');

  };

  const ids=purchasedProducts.productsIdinCart
  const quantities=purchasedProducts.quantityProduct
  
  useEffect(()=>{
    obtenerProd(ids);
    let userId=cache.get('userId')
    return ()=>{
      limpiarCartDB(userId,ids)
    }
  },[])
  
  useEffect(()=>{
    cambiarStock(ids)
  },[nombres])
  
  
  async function obtenerProd(ids){
    try {
      for(let i=0;i<ids.length;i++){
        let id=ids[i]
        let response = await axios.get(`/products/${id}`)
        setStocks((prevStocks)=>[...prevStocks, response.data.stock])
        setNombres((prevNombres) => [response.data.name, ...prevNombres])
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function cambiarStock(ids){
    try {
      for(let i=0;i<ids.length;i++){
        let id=ids[i]
        console.log('stoks', stocks[i] ,'q', quantities[i])
        let newStock=stocks[i]-quantities[i]
        console.log('newStock',newStock)
        let body={
          stock:newStock
        }
        let response = await axios.put(`/products/${id}`,body)
        console.log(response.status)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function limpiarCartDB(userId,ids){
    try {
      const response=await axios.put(`/carts/clear/${userId}`)
    } catch (error) {
      console.log(error)
    }
    try {
      for(let i=0;i<ids.length;i++){
        let productId=ids[i]
        const response2=await axios.delete(`carts/${productId}/${userId}`)
      }
    } catch (error) {
      console.log(error)
    }
  }


  //  const sendEmail = () => {

  // //   const serviceId = "service_u05znjz"; // Reemplaza con tu ID de servicio
  // //   const templateId = "template_c9zye1k"; // Reemplaza con tu ID de plantilla
  // //   const userId = "dl6sI5xgzMzAmHsFV"; // Reemplaza con tu ID de usuario

  // //   const emailParams = {
  // //     from_email: "adlctech01@gmail.com",
  // //     to_name: user.given_name,
  // //     to_email: user.email,
  // //     message: `Productos adquiridos:\n${nombres.join('\n')}`,
  // //   };

  // //   emailjs.send(serviceId, templateId, emailParams, userId)
  // //     .then((response) => {
  // //       console.log('Email enviado con éxito:', response);
  // //     })
  // //     .catch((error) => {
  // //       console.error('Error al enviar el email:', error);
  // //     });
  // // };

  // useEffect(() => {
  //   sendEmail();
  // }, []);

  const [isLoadingTimeout, setIsLoadingTimeout] = useState(true);

  useEffect(() => {
    // Establecer isLoadingTimeout en falso después de 2 segundos
    const timer = setTimeout(() => {
      setIsLoadingTimeout(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoadingTimeout ? (
        <div className="loadingContainer">
          <Loading />
        </div>
      ) : (
    <div className={styles.contenedorConfirm}>
      <div className={styles["confirmation-container"]}>
      <h1 className={styles["confirmation-title"]}>Compra Exitosa</h1>
{/* 
      <div className={styles["payment-info"]}>
        <p>ID de Pago: {paymentInfo.payment.id}</p>
        <p>Monto: ${paymentInfo.payment.amount}</p>
      </div> */}

      <div className={styles["cart-items"]}>
          <h2>Productos adquiridos:</h2>
          <ul>
            {nombres.map((product,index) => (
              <li key={index}>{product}</li>
            ))}
          </ul>
      </div>

      <a onClick={handleReturnToProducts} className={styles["back-link"]}>
              Volver a Productos
      </a>
    </div>
    </div>
    )}
    </>
  );
};

export default ConfirmationPage;

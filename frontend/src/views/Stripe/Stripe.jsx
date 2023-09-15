import axios from "axios";
import style from "./Stripe.module.css";
import React, { useState, useRef } from "react";
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../../components/Loading/Loading"; 


// Key visible ** la secreta esta en el Server
const stripePromise = loadStripe(
  "pk_test_51NnMQaEUVHui4qp0KnEfLflyUrkDfZDN9jLhIq7Vzb4RGVvCG0tCfEDmgi9GKV1CYCXc5TYzU7FcS4BXCXmSv8tC00L9f6qNwM"
);

const CheckoutForm = ({ userId, productId, quantity, total_price }) => {
  const history = useHistory(); // Inicializa useHistory
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setLoading] = useState(false);
  const cardElement = useRef(null);
  const dataCart = useSelector((state) => state.cart) // sacar datos del carrito
  const { user } = useAuth0();

  // Imprime los datos en la consola
  console.log("infoCART", dataCart)
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement.current || elements.getElement(CardElement),
    });
    setLoading(true);

    if (!error && paymentMethod) {
      try {
        const { id } = paymentMethod;
        const { data } = await axios.post(
          "http://localhost:3001/api/checkout",
          {
            id: id,
            amount: 10000,
            userId: user.userId,  
            productId: productId, 
            quantity: quantity,  
            total_price: total_price,  
            return_url: "http://localhost:3000/confirmation",
          }
        );
        console.log(data);
        elements.getElement(CardElement).clear();
        // Ahora puedes usar paymentIntentId para redirigir a la página de confirmación
        history.push({
          pathname: "/confirmation",
          state: {
            paymentInfo: data,
          },
        });
      } catch (error) {
        console.error("Error al realizar la solicitud al servidor:", error);
        history.push("/cancel");
      } finally {
        setLoading(false);
      }
    } else {
      console.error("Error al crear el método de pago:", error);
      history.push("/cancel");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} method="POST">
      <h2 className={style.precio}>Precio: {total_price} </h2> 
      <div className={style.subtituloVisa}>
        <h2>Numero TC. </h2>
        <h2> Fecha Vencimiento</h2>
      </div>
      <div className={style.cardContainer}>
        <CardElement className={style.visa} />
      </div>
      <button className={style.button} disabled={!stripe}>
        {isLoading ? (
          <div>
            <span className={style.loadingContainer}>
              <Loading />
            </span>
          </div>
        ) : (
          "Comprar"
        )}
      </button>
    </form>
  );
};

const Stripe = () => {
  return (
    <main className={style.card}>
      <Elements stripe={stripePromise}>
        <div className={style.container}>
          <h1>Pasarela de pagos</h1>
          <CheckoutForm />
        </div>
      </Elements>
    </main>
  );
};

export default Stripe;

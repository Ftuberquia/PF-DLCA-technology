import axios from "axios";
import style from "./Stripe.module.css";
import React, { useState, useRef, useEffect } from "react";
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
import { useSelector } from "react-redux"; 


// Key visible ** la secreta esta en el Server
const stripePromise = loadStripe(
  "pk_test_51Nrjc9CrlqJ1omum6CjPStGPSoGeeDMHzYPnRaQT4tylICxHdiYEytpJe9UqmYhzN4kCARZRxWaFxWWcaCRCkjjt008m1oWbUr"
);

const CheckoutForm = ({ userId, productId, quantity, total_price }) => {
  const history = useHistory(); // Inicializa useHistory
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setLoading] = useState(false);
  const cardElement = useRef(null);
  // const ProductsIds = useSelector((state) => state.cart);
  // const ProductsQuantities = useSelector((state) => state.cart)
  // const ProductsPrices = useSelector((state) => state.cart)
  const { user } = useAuth0();

  const infoCarrito = useSelector((state)=>state.compra)

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement.current || elements.getElement(CardElement),
    });

    if (!error){
      const { id: stripePaymentIntentId } = paymentMethod;
      const userId = user.sub;
    //   const productIds = ProductsIds.map((product) => product.id);
    //   const productQuantities = ProductsQuantities.map((product) => product.quantity)
    //   const productsPrices = ProductsPrices.map((product) => product.price)

    // // Calculate totalPrice based on quantities and prices
    // const totalPrice = productQuantities.reduce((total, quantity, index) => {
    //   return total + quantity * productsPrices[index];
    // }, 0);
      
    const productIds=infoCarrito.productsIdinCart
    const quantities=infoCarrito.quantityProduct
    const priceProductTotal=infoCarrito.priceProductTotal
    const totalPrice=infoCarrito.totalPriceAllProducts
    const totalQuantityProducts=infoCarrito.totalQuantityProducts

      try {
        const { data } = await axios.post("http://localhost:3001/purchase", {
          userId,
          productIds,
          quantities,
          totalPrice,
          totalQuantityProducts,
          priceProductTotal,
          amount: totalPrice,
          currency: "USD",
          return_url: "http://localhost:3000/confirmation",
          payment_method: "pm_card_visa",
        })
        
          elements.getElement(CardElement).clear();
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
      
    }
    // setLoading(true);

    // if (!error && paymentMethod) {
    //   try {
    //     const { id } = paymentMethod;
    //     const { data } = await axios.post(
    //       "http://localhost:3001/compras",
    //       {
    //         id: id,
    //         amount: 10000, // precio a cambiar
    //         return_url: "http://localhost:3000/confirmation",
    //       }
    //     );
    //     console.log(paymentMethod);
    //     elements.getElement(CardElement).clear();
    //     // Ahora puedes usar paymentIntentId para redirigir a la página de confirmación
    //     history.push({
    //       pathname: "/confirmation",
    //       state: {
    //         paymentInfo: data,
    //       },
    //     });
    //   } catch (error) {
    //     console.error("Error al realizar la solicitud al servidor:", error);
    //     history.push("/cancel");
    //   } finally {
    //     setLoading(false);
    //   }
    // } else {
    //   console.error("Error al crear el método de pago:", error);
    //   history.push("/cancel");
    // }
    // setLoading(false);
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

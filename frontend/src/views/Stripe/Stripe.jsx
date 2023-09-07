import React from "react";
import axios from "axios";
import style from './Stripe.module.css';
import { loadStripe } from "@stripe/stripe-js";
import  { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import Productos from "../Productos/Productos";

const stripePromise = loadStripe("pk_test_51NnMQaEUVHui4qp0KnEfLflyUrkDfZDN9jLhIq7Vzb4RGVvCG0tCfEDmgi9GKV1CYCXc5TYzU7FcS4BXCXmSv8tC00L9f6qNwM")

const CheckoutForm = () => {

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const {error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        });

        if (!error) {
            try {
                const { data } = await axios.post('http://localhost:3001/api/checkout', {
                    id: paymentMethod.id,
                    amount: 1000000
                });
                console.log(data);
            } catch (error) {
                console.error("Error al realizar la solicitud al servidor:", error);
            }
        } else {
            console.error("Error al crear el método de pago:", error);
        }
    }

    return (
    <form onSubmit={handleSubmit}className="">

        <img className={style.products} src={''} alt="product-cart"/>
        
        <h3 className={style.precio}>Precio: 100$ </h3>
        <div className={style.cardContainer}>
            <CardElement className={style.visa}/>
        </div>
        <button className={style.button}>
            Comprar
        </button>
    </form>)
}

const Stripe = () => {
    return (
        <main className={style.card}>
            <Elements stripe={stripePromise}>        
            <div className={style.container}>
                <h1>Pasarela de pagos Stripe</h1>
                <CheckoutForm/>
            </div>
        </Elements>
        </main>
        
        
    );
};

export default Stripe;
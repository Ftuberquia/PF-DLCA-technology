import React from "react";
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

        if(!error){
            console.log(paymentMethod);
        }

    }

    return (
    <form onSubmit={handleSubmit}className="">

        <img className={style.products} src={''} alt="product-cart"/>
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
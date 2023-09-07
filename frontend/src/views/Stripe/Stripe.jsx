import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import  { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"

const stripePromise = loadStripe("pk_test_51NnMQaEUVHui4qp0KnEfLflyUrkDfZDN9jLhIq7Vzb4RGVvCG0tCfEDmgi9GKV1CYCXc5TYzU7FcS4BXCXmSv8tC00L9f6qNwM")

const CheckoutForm = () => {

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const {error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        })

    }

    return (
    <form onSubmit={handleSubmit}>
        <CardElement/>
        <button>
            Comprar
        </button>
    </form>)
}

const Stripe = () => {
    return (
        <div>
            <h1>Pasarela de pagos Stripe</h1>
        <Elements stripe={stripePromise}>        
            <CheckoutForm/>
        </Elements>
        </div>
        
    );
};

export default Stripe;
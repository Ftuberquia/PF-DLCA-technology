import React from "react";
import style from "./Purchase.module.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import "bootswatch/dist/slate/bootstrap.min.css"

const stripePromise = loadStripe("pk_test_51Nrjc9CrlqJ1omum6CjPStGPSoGeeDMHzYPnRaQT4tylICxHdiYEytpJe9UqmYhzN4kCARZRxWaFxWWcaCRCkjjt008m1oWbUr")

const CheckOutForm = () => {

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
            event.preventDefault();

        const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardElement)
            })
            if (!error){
                console.log(paymentMethod);
            }
        }
        return <form onSubmit={handleSubmit} className="card card-body">

                    <div className={style.cardContainer}>
                        <CardElement className={style.visa}/> 
                    </div>
                    <button className="btn btn-success">COMPRAR</button> 

                </form>
}

const Purchase = () => {

    return (
        <main className={style.card}>
            <Elements stripe = {stripePromise}>
                <div className={style.container}>
                        <div className="col-md-4 offset-md-4">
                        <CheckOutForm/>
                    </div>
                </div>
            </Elements>
        </main>
      );
    };

export default Purchase;
// const { Users, Orders, UserOrder, Products } = require('../../db');
// const Stripe = require('stripe'); //info desde el front
// // KEY secreta de Stripe 
// const stripe = new Stripe("sk_test_51NnMQaEUVHui4qp0BDSWGwhNtmw1gJbJF4tue1zqpRo3l56iE83u0VImKkguK6J1qgqJakEW2NCnVtUffGOoHwQp00qsaUMPZy")

// // Realiza el pago a través de Stripe
// // En tu archivo donde se crea paymentIntent (por ejemplo, payment.js)

// async function paymentIntent(id, total_price, return_url) {
//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: total_price * 100, // conversion centavos
//       currency: 'USD',
//       description: 'Compra en tu aplicación',
//       payment_method: id,
//       confirm: true,
//       return_url,
//     });
    
//     return paymentIntent.client_secret;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }

// module.exports = {
//   paymentIntent
// };



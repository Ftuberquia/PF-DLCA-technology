const {Router} = require ("express");
const { handlePurchase } = require("../../handlers/purchase/purchaseHandler");

// const Stripe = require('stripe'); //info desde el front
// // KEY secreta de Stripe 
// const stripe = new Stripe("sk_test_51NnMQaEUVHui4qp0BDSWGwhNtmw1gJbJF4tue1zqpRo3l56iE83u0VImKkguK6J1qgqJakEW2NCnVtUffGOoHwQp00qsaUMPZy")

// const compras = Router()

compras.post("/", handlePurchase);

// module.exports = compras
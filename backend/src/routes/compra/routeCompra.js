// const {Router} = require ("express")
// const { Users, Orders, UserOrder, Products } = require('../../db');
// const cors = require('cors');

// const Stripe = require('stripe'); //info desde el front
// // KEY secreta de Stripe 
// const stripe = new Stripe("sk_test_51NnMQaEUVHui4qp0BDSWGwhNtmw1gJbJF4tue1zqpRo3l56iE83u0VImKkguK6J1qgqJakEW2NCnVtUffGOoHwQp00qsaUMPZy")

// const compras = Router()

// // Para mostrar los compra de un usuario
// compras.get("/:productId", getUserOrders);
// compras.get("/:userId", getUserOrders);

// // Para agregar compra
// compras.post('/api/checkout', createOrder);

// compras.post('/api/checkout', async (req, res) => {
// 	try{
// 		const { id, amount, return_url, userId, productId, quantity, total_price } = req.body;

// 		const payment = await stripe.paymentIntents.create({
// 			amount,
// 			currency: "USD",
// 			description: "Producto de tegnologia", // descripcion desde la base de datos
// 			payment_method: id,
// 			confirm: true,
// 			return_url,
// 		});
// 		console.log(payment);
// 		res.send({message: 'Pago exitoso', payment});

// 	} catch (error) {
// 		console.log(error);
// 		// res.json({message: error.raw.message})
// 		return res.redirect("/cancel");
// 	}
//   });


// module.exports = compras
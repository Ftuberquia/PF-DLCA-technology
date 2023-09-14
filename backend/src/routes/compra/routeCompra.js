const {Router} = require ("express")
const getUserOrders = require("../../controllers/compras/getCompras")
const {createOrder} = require("../../controllers/compras/postCompras")


const compras = Router()

// Para mostrar los compra de un usuario
compras.get("/:userId", getUserOrders);
compras.get("/:productId", getUserOrders);

// Para agregar compra
compras.post('/compras', createOrder);

// compras.post('/api/checkout', async (req, res) => {
// 	try{
// 		const { id, amount, return_url, userId, productId, quantity, total_price } = req.body;
// 		// const result = await Order.create({
// 		// 	userId,
// 		// 	productId,
// 		// 	quantity,
// 		// 	total_price,
// 		//   });

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


module.exports = compras
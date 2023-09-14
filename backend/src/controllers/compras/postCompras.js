const { Users, Orders, UserOrder, Products } = require('../../db');
const Stripe = require('stripe'); //info desde el front

// KEY secreta de Stripe 
const stripe = new Stripe("sk_test_51NnMQaEUVHui4qp0BDSWGwhNtmw1gJbJF4tue1zqpRo3l56iE83u0VImKkguK6J1qgqJakEW2NCnVtUffGOoHwQp00qsaUMPZy")


const createOrder = async (req, res) => {
  try {
    const { userId, productId, quantity, total_price, id, amount, return_url, } = req.body;

    // Verifica si el usuario y el producto existen
    const user = await Users.findByPk(userId);
    const product = await Products.findByPk(productId);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Crea una nueva compra en la tabla "orders"
    const newOrder = await Orders.create({
      userId: user.id,
      order_date: new Date(),
      state: 'Pendiente',
      quantity,
      total_price,
      created: true,
    });

    // Asocia el producto a la compra utilizando UserOrder
    await UserOrder.create({
      userId: user.id,
      orderId: newOrder.id, // Utiliza el ID de la compra recién creada
      productId: product.id, // Utiliza el ID del producto
      quantity,
    });

    // Realiza el pago a través de Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total_price * 100, // Stripe utiliza centavos en lugar de dólares
      currency: 'USD',
      description: 'Compra en tu aplicación',
      paymentMethod: ['card'],
      confirm: true,
			return_url,
    });

    return res.status(201).json({
      message: 'Compra realizada con éxito',
      order: newOrder,
      paymentIntent: paymentIntent.client_secret, // Envía el secreto del cliente de Stripe
    });
  } catch (error) {
    console.error('Error al crear la compra:', error);
    return res.status(500).json({ message: 'Error al procesar la compra', error: error.message });
  }
};

module.exports = {
  createOrder,
};


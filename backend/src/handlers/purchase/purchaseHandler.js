const purchaseController = require('../../controllers/purchase/purchaseController');
const Stripe = require('stripe');
const { stripeSecretKey } = require('../../stripeConfig/stripeConfig')

const stripe = new Stripe(stripeSecretKey)

const handlePurchase = async (req, res) => {
  try {
    const { userId, productIds, quantities, totalPrice, stripePaymentIntentId, amount, currency } = req.body;

    // Realizar la compra (suponiendo que purchaseController.createPurchase devuelve la compra creada)
    const purchase = await purchaseController.createPurchase(
      userId,
      productIds,
      quantities,
      totalPrice
    );

    // Crear un pago en Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      confirm: true,
      return_url: req.body.return_url,
      payment_method: req.body.payment_method  
    });

    // Enviar la información de la compra y el pago a la interfaz de usuario
    res.status(200).json({ purchase });
  } catch (error) {
    res.status(500).json(error.message);
  }
};


module.exports = {
  handlePurchase,
};
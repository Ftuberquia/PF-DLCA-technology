// const { Users, Products, Orders } = require('../../db');

const createOrder = async (req, res) => {
  try {
    const { userId, productId, quantity, total_price } = req.body;

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
      estate: 'Pendiente', // Estado inicial de la orden 
      quantity, // Cantidad de productos
      total_price, 
      created: true, // Indicador de compra creada
    });

    // Asocia el producto a la compra
    await newOrder.addProducts(product);

    return res.status(201).json({ message: 'Compra realizada con éxito', order: newOrder });
  } catch (error) {
    console.error('Error al crear la compra:', error);
    return res.status(500).json({ message: 'Error al procesar la compra', error });
  }
};

module.exports = {
  createOrder,
};

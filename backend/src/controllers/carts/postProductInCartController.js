const Cart = require("../../db");

const postProductInCartController = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
      // Crea una nueva entrada en la base de datos del carrito
      const newCartItem = await Cart.create({
        productId,
        quantity,
        pagado: false, // Puedes establecer otros valores predeterminados aquí
        fechaCompra: null, // Puedes establecer otros valores predeterminados aquí
      });
  
      return res.status(201).json({ message: 'Producto agregado con éxito', cart: newCartItem });
    } catch (error) {
        console.error('Error al cargar un producto al carrito:', error);
        return res.status(500).json(error.message);
    }
  };

  module.exports = postProductInCartController
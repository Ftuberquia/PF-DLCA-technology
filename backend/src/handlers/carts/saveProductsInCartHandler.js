const {Products,Cart, Tags, Brand, Category, Subcategory} = require('../../db');

const saveProductsInCart = async (req, res) => {
  console.log('cartId:', req);
  console.log('cartId:', cartId);
  console.log('products:', products);
  const { cartId, products } = req.body; // Supongo que recibes el ID del carrito y una lista de productos en el cuerpo de la solicitud

  try {
    // Busca el carrito por su ID
    const cart = await Cart.findByPk(cartId);

    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    // Ahora, iteramos sobre la lista de productos y los asociamos con el carrito en la tabla cart_product
    for (const productData of products) {
      // Supongamos que productData contiene los datos del producto a guardar

      // Crea un nuevo producto en la base de datos
      const newProduct = await Products.create(productData);

      // Asocia el producto con el carrito en la tabla cart_product
      await cart.addProduct(newProduct);
    }

    return res.status(200).json({ message: 'Productos guardados en el carrito' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al guardar productos en el carrito' });
  }
};

module.exports = saveProductsInCart;
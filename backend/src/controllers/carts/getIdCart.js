const { Cart, Products } = require("../../db");

const getIdCart = async (userId) => {
  // Verificar si ya existe un carrito para el cliente
  const cartExistente = await Cart.findOne({
    where: {
      userId,
      pagado: false,
    },
  });

  if (!cartExistente) {
    throw new Error(`No existe un carrito para el cliente con ID ${clienteId}.`);
  }

  cartExistente.dataValues.id = cartExistente.dataValues.id;

  // Obtener la lista de productos del carrito
  const productos = cartExistente.dataValues.productos;

  // Recorrer los productos y agregar información adicional

  let precioTotalCart = 0; // Inicializar el precio total del carrito

  for (const producto of productos) {

    const productoInfo = await Products.findByPk(producto.productoId);
    if (productoInfo) {
      producto.name = productoInfo.name;
      producto.imageSrc = productoInfo.imageSrc;
      producto.price = productoInfo.price;

      // Calcular el precio total del producto
      producto.precioTotal = producto.cantidad * producto.price;

      // Agregar el precio total del producto al precio total del carrito
      precioTotalCart += producto.precioTotal;
    }
  }
};

module.exports = getIdCart
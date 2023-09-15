const { Cart } = require("../../db");

const getTotalPriceCart = async (cartId) => {
  const cartTotalPrice = await Cart.findByPk(cartId);

  if (!cartTotalPrice) {
    // El carrito con el id especificado no existe
    return null;
  }

  const infoValorTotalCarrito = cartTotalPrice.total_precio;

  return infoValorTotalCarrito;
};

module.exports = getTotalPriceCart;

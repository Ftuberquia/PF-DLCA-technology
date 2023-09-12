const updateProductInCart =require('../../controllers/carts/updateProductInCart')

const updateProductsInCart = async (req, res) => {
  const { cartId } = req.params;
  const { pagado } = req.body;

  try {
    const cartAcutalizado = await updateProductInCart(pagado,cartId)
    return res.status(200).json(cartAcutalizado)
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error al actualizar el carrito" });
  }
};

module.exports = updateProductsInCart;

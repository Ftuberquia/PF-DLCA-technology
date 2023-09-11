const updateProductInCart =require('../../controllers/carts/updateProductInCart')

const updateProductsInCart = async (req, res) => {
  const { cartId, productId } = req.params;
  const { quantity, total_precio,pagado } = req.body;

  try {
    const cambioProduct=await updateProductInCart(quantity, total_precio,pagado,cartId, productId)
    return res.status(200).json(cambioProduct)
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error al actualizar producto en el carrito" });
  }
};

module.exports = updateProductsInCart;

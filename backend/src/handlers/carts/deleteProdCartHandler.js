const deleteProdCart = require("../../controllers/carts/deleteProdCart");

const deleteProdCartHandler = async (req, res) => {
  const { productId, cartId } = req.params;

  try {
    await deleteProdCart(productId, cartId);
    res.status(200).json("Producto eliminado");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = deleteProdCartHandler;

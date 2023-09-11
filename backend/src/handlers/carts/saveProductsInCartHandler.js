const postProduct = require("../../controllers/carts/saveProductInCart");
const saveProductsInCart = async (req, res) => {
  const { cartId, productId } = req.params;
  const { quantity, total_precio, pagado } = req.body;

  try {
    const newProduct = await postProduct(
      cartId,
      productId,
      quantity,
      total_precio,
      pagado
    );
    return res
      .status(200)
      .json({ message: "producto agregado al carrito", newProduct });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = saveProductsInCart;

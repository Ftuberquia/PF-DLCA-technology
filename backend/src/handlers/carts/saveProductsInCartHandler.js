const postProduct = require("../../controllers/carts/saveProductInCart");
const saveProductsInCart = async (req, res) => {
  const { userId, productId } = req.params;
  const { quantity_prod } = req.body;

  try {
    const newProduct = await postProduct(userId, productId, quantity_prod);
    return res
      .status(200)
      .json({ message: "producto agregado al carrito", newProduct });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = saveProductsInCart;

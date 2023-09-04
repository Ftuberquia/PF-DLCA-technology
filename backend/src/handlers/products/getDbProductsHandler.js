const getDbProducts = require("../../controllers/products/getDbProducts");

const getDbProductsHandler = async (req, res) => {
  try {
    const dataProducts = await getDbProducts();
    res.status(200).json(dataProducts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports = getDbProductsHandler;

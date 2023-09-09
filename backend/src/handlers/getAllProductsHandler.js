const {getAllProducts, getProductByName,} = require("../controllers/products/getAllProducts");

const applyFilters = require('../controllers/filters/filtroComplejo')

const getAllProductsHandler = async (req, res) => {
  let page = parseInt(req.query.page); // Convierte el valor de page a un número entero

  if (isNaN(page) || page < 1) {
    page = 1; // Si el valor de page no es un número válido, establece page en 1 por defecto
  }

  const { name, brand, subcategory, category, order, priceOrder } = req.query;

  let result;

    try {
      // si llega un name muestra el producto
      if (name) {
        result = await getProductByName(name);
      }else if (brand || subcategory || category) {
        result = await applyFilters(brand, subcategory, category, page, order, priceOrder);
      } else {
        result = await getAllProducts(page, order, priceOrder);
      }

      res.status(200).json(result);

    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };
  
  module.exports = { getAllProductsHandler };
  
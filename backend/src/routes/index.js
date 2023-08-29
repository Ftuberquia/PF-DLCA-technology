const { Router } = require("express");
const router = Router();
const { getAllProductsHandler } = require("../handlers/getAllProductsHandler");
const { getDetailHandler } = require("../handlers/getProductDetailHandler");
const getDbProducts = require("../controllers/getDbProducts");
const postCreateProduct = require("../controllers/postCreateProduct");


//Ruta para mostrar los productos
router.use("/productos", getAllProductsHandler);

//Ruta para mostrar el detalle de los productos
router.use("/productos/:id", getDetailHandler);

//Ruta para llenar la base de datos con los productos se utiliza una sola vez
router.use("/dbproducts", getDbProducts);

//Ruta para almacenar un nuevo producto al db
router.use("/productos", postCreateProduct);


module.exports = router;


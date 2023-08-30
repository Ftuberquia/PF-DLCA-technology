const { Router } = require("express");
const getDbProducts = require ("../controllers/getDbProducts")
const products = require("../routes/products/routeProducts")
const categories = require ("../routes/categories/routeCategories")
const subCategories = require ("../routes/subCategories/routeSubCategories")
const router = Router();

//ruta para acceder a los productos
router.use("/products", products)

//Ruta para acceder a las categorias
router.use("/categories", categories)

//Ruta para acceder a las subcategorias
router.use('/subcategoria',subCategories)

//este guarda los productos en la base de datos : !!se usa una sola vez para llenar la base de datos!!
router.use("/db", getDbProducts)

module.exports = router;
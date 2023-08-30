const { Router } = require("express");
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


module.exports = router;


const { Router } = require("express");

const getDbProductsHandler=require('../handlers/products/getDbProductsHandler')
const products = require("../routes/products/routeProducts")
const categories = require ("../routes/categories/routeCategories")
const subCategories = require ("../routes/subCategories/routeSubCategories");
const tags = require("./tags/routeTags");
const brands=require('./brands/routeBrands');
const contactHandler = require("../handlers/contact/contactHandler");
const favorites = require("./favorites/routeFav");
const filters = require ("./filters/filters")
const carts = require ("./carts/routeCarts")
const reviews = require("./reviews/routeReviews")
const stripe = require ("./compra/routeCompra");
const users = require("../routes/users/routeUsers")

const router = Router();

//ruta para acceder a los productos
router.use("/products", products)

//ruta para acceder a users
router.use("/users",users)

//Ruta para acceder a las categorias
router.use("/categories", categories)

//Ruta para acceder a las subcategorias
router.use('/subcategoria',subCategories)

//Ruta para acceder a los tags
router.use('/tags',tags)

//Ruta para acceder a las brands
router.use('/brands',brands)

//este guarda los productos en la base de datos : !!se usa una sola vez para llenar la base de datos!!
router.use("/db", getDbProductsHandler)

//Ruta para los favorites
router.use("/favorites", favorites)

// router.use("/contact", contactHandler)

//Ruta para los filtros
router.use("/filter", filters)

//Ruta para los carritos
router.use("/carts",carts)

//Ruta para los reviews
router.use("/reviews", reviews)

////Ruta para los carritos
// router.use("/compras",stripe)

module.exports = router;


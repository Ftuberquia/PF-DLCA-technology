const {Router} = require ("express")
const { getAllProductsHandler } = require("../../handlers/getAllProductsHandler");
<<<<<<< HEAD
const { getDetailHandler } = require("../../handlers/getProductDetailHandler");
const getDbProducts = require("../../controllers/getDbProducts");
const postCreateProduct = require("../../controllers/postCreateProduct");
=======
const { getDetailHandler } = require("../../handlers/products/getProductDetailHandler");
const postProduct = require ("../../handlers/products/createProductHandler") 
>>>>>>> 51ffac2285cccea75b914f6b0838b123041c5366

const products = Router()

//este trae todos los productos y los productos por nombre
products.get("/", getAllProductsHandler)
//este trae los detalles del producto
products.get("/:id", getDetailHandler)

<<<<<<< HEAD
products.post("/", postCreateProduct)
=======
products.post("/", postProduct)
>>>>>>> 51ffac2285cccea75b914f6b0838b123041c5366

module.exports = products
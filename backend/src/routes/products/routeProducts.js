const {Router} = require ("express")
const { getAllProductsHandler } = require("../../handlers/getAllProductsHandler");
const { getDetailHandler } = require("../../handlers/getProductDetailHandler");
const getDbProducts = require("../../controllers/getDbProducts");
const postCreateProduct = require("../../controllers/postCreateProduct");
const { getDetailHandler } = require("../../handlers/products/getProductDetailHandler");
const postProduct = require ("../../handlers/products/createProductHandler") 

const products = Router()

//este trae todos los productos y los productos por nombre
products.get("/", getAllProductsHandler)
//este trae los detalles del producto
products.get("/:id", getDetailHandler)

products.post("/", postCreateProduct)

products.post("/", postProduct)


module.exports = products

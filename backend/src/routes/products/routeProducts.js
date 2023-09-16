const {Router} = require ("express")
const { getAllProductsHandler } = require("../../handlers/getAllProductsHandler");
const { getDetailHandler } = require("../../handlers/products/getProductDetailHandler");
const postProduct = require ("../../handlers/products/createProductHandler"); 
const updateProductHandler = require("../../handlers/products/updateProductHandler");

const products = Router()

//este trae todos los productos y los productos por nombre
products.get("/", getAllProductsHandler)

//este trae los detalles del producto
products.get("/:id", getDetailHandler)

products.post("/", postProduct)

products.put("/:id", updateProductHandler)

module.exports = products
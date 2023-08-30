const {Router} = require ("express")
const { getAllProductsHandler } = require("../../handlers/getAllProductsHandler");
const { getDetailHandler } = require("../../handlers/getProductDetailHandler");

const postCreateProduct = require("../../controllers/postCreateProduct");

const products = Router()

//este trae todos los productos y los productos por nombre
products.get("/", getAllProductsHandler)
//este trae los detalles del producto
products.get("/:id", getDetailHandler)

products.post("/", postCreateProduct)

module.exports = products
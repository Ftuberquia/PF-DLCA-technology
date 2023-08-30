const {Router} = require ("express")
const { getAllProductsHandler } = require("../../handlers/getAllProductsHandler");
const { getDetailHandler } = require("../../handlers/getProductDetailHandler");
const getDbProducts = require("../../controllers/getDbProducts");
const postCreateProduct = require("../../controllers/postCreateProduct");

const products = Router()

//este trae todos los productos y los productos por nombre
products.get("/", getAllProductsHandler)
//este trae los detalles del producto
products.get("/:id", getDetailHandler)
//este guarda los productos en la base de datos : !!se usa una sola vez para llenar la base de datos!!
products.get("/db", getDbProducts)
//este crea un producto
products.post("/", postCreateProduct)

module.exports = products
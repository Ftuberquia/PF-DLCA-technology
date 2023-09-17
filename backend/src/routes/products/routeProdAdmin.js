const {Router} = require ("express")
const getProductsHandler = require ("../../handlers/products/getProductsHandler")

const admin = Router()

admin.get("/", getProductsHandler)

module.exports = admin
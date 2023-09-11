const {Router} = require ("express")
const getCartsDB = require ("../../handlers/carts/getCartsHandler")
const getFilterByCart = require('../../handlers/carts/getFilterCartHandler')
const saveProductsInCart = require('../../handlers/carts/saveProductsInCartHandler')

const carts = Router()

carts.get("/", getCartsDB)
carts.get('/filteredCarts', getFilterByCart)
carts.post('/saveProducts', saveProductsInCart);

module.exports = carts
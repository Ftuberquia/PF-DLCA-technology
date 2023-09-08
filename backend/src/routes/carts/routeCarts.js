const {Router} = require ("express")
const getCartsDB = require ("../../handlers/carts/getCartsHandler")
const getFilterByCart = require('../../handlers/carts/getFilterCartHandler')

const carts = Router()

carts.get("/", getCartsDB)
carts.get('/filteredCarts', getFilterByCart)

module.exports = carts
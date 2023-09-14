const {Router} = require ("express")
const clearCartHandler = require('../../handlers/carts/clearCartHandler')
const deleteProdCartHandler = require('../../handlers/carts/deleteProdCartHandler')
const saveProductsInCart = require('../../handlers/carts/saveProductsInCartHandler')
const updateProductsInCart = require('../../handlers/carts/updateProductsInCartHandler')
const updateQuantityProductHandler = require ('../../handlers/carts/updateQuantityProductHandler')
const getCartHandler = require('../../handlers/carts/getCartHandler')
const getIdCartHandler = require('../../handlers/carts/getIdCartHandler')

const carts = Router()

carts.get("/:userId", getCartHandler)
carts.get('/idcarrito/:userId',getIdCartHandler)
carts.put('/:userId',clearCartHandler)
carts.delete("/:productId/:cartId", deleteProdCartHandler)
carts.post("/:cartId/:productId", saveProductsInCart)
carts.put("/:cartId", updateProductsInCart)
carts.put("/:cartId/:productId", updateQuantityProductHandler)

module.exports = carts
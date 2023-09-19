const {Router} = require ("express")
const clearCartHandler = require('../../handlers/carts/clearCartHandler')
const deleteProdCartHandler = require('../../handlers/carts/deleteProdCartHandler')
const saveProductsInCart = require('../../handlers/carts/saveProductsInCartHandler')
const updateProductsInCart = require('../../handlers/carts/updateProductsInCartHandler')
const updateQuantityProductHandler = require ('../../handlers/carts/updateQuantityProductHandler')
const getCartHandler = require('../../handlers/carts/getCartHandler')
const getIdCartHandler = require('../../handlers/carts/getIdCartHandler')
const getTotalPriceCartHandler = require('../../handlers/carts/getTotalPriceCartHandler')

const carts = Router()

carts.get("/:userId", getCartHandler)   //funciona, devuelve idCart, quantity, pagado, tota_price, userId, productId de los productos del carrito
carts.get('/idcarrito/:userId',getIdCartHandler)  //Funciona, devuelve el idCart como un numero, sin llaves, sin corchetes
carts.post("/:userId/:productId", saveProductsInCart)  //Funciona, se usa para agregar solo una vez el producto al carrito, requiere userId y productId por params y quantity por body
carts.delete("/:productId/:userId", deleteProdCartHandler)  //Funciona, se usa para eliminar el producto del carrito, sin importar la cantidad que tenga.
carts.put("/:cartId", updateProductsInCart)  //Funciona, cambia el estado de pagado(creo no es necesaria)
carts.put('/:userId',clearCartHandler)  //Funciona, limpia el carrito, reiniciando los valores a 0
carts.put("/:userId/:productId", updateQuantityProductHandler)  //Para los + y - dentro del carrito, actualiza cantidad y precios

carts.get("/totalValor/:cartId", getTotalPriceCartHandler) //Funciona, devuelve solo el valor total del carrito

module.exports = carts
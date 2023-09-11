// const {Router} = require ("express")
// const { getCompra, saveCompra } = require("../../handlers")

const Compras = Router()

//Para mostrar los compra de un usuario
favorites.get("/:userId", getCompra);

//Para agregar compra
favorites.post('/api/checkout', postCompra);


module.exports = Compras
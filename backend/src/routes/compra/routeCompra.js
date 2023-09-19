const {Router} = require ("express");
const { handlePurchase } = require("../../handlers/purchase/purchaseHandler");


const compras = Router()

compras.post("/", handlePurchase);

module.exports = compras
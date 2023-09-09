const {Router} = require ("express")
const getBrandsDB = require ("../../handlers/brands/getBrandsHandler")

const brands = Router()

brands.get("/", getBrandsDB)


module.exports = brands
const {Router} = require ("express")
const getBrandsDB = require ("../../handlers/brands/getBrandsHandler")
const getFilterByBrand = require('../../handlers/brands/getFilterBrandHandler')

const brands = Router()

brands.get("/", getBrandsDB)
brands.get('/filteredBrand', getFilterByBrand)

module.exports = brands
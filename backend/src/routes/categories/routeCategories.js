const {Router} = require ("express")
const getCategories = require ("../../handlers/categories/categoriesHandler")

const categories = Router()

categories.get("/", getCategories)


module.exports = categories
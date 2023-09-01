const {Router} = require ("express")
const getCategories = require ("../../handlers/categories/categoriesHandler")
const handlerFilterCat = require("../../handlers/categories/filterCat")

const categories = Router()

categories.get("/", getCategories)
categories.get("/filtercat", handlerFilterCat)

module.exports = categories
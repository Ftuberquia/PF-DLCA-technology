const {Router} = require("express")
const handlerFilter = require("../../handlers/filters/handlerFilters")

const filter = Router()

filter.get("/", handlerFilter)

module.exports = filter
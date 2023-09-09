const {Router} = require ("express")
const getPaginate = require ("../../controllers/paginate/getPaginate")

const paginate = Router()

paginate.get("/", getPaginate)

module.exports = paginate
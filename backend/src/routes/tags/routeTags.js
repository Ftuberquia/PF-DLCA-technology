const {Router} = require ("express")
const getTagsDB = require ("../../handlers/tags/getTagsHandler")

const tags = Router()

tags.get("/", getTagsDB)

module.exports = tags
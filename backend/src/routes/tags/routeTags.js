const {Router} = require ("express")
const getTagsDB = require ("../../handlers/tags/getTagsHandler")
const getFilterByTag=require('../../handlers/tags/getFilterTagHandler')

const tags = Router()

tags.get("/", getTagsDB)
tags.get('/filteredTag',getFilterByTag)

module.exports = tags
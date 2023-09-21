const { Router } = require("express");
const getSubCategories = require("../../handlers/subcategories/subCategoriesHandler");

const subCategories = Router();

subCategories.get("/", getSubCategories);

module.exports = subCategories;

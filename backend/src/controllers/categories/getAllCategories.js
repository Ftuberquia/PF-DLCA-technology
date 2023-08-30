const axios = require ("axios")
const {Category} = require ("../../db")
const categoriesData = require ("../../utils/category")

const Allcategories = async() => {
        const AllCategories = await Category.findAll()
        let allCategoriesDb = AllCategories.map((el)=> el.name)
        if(!allCategoriesDb.length){
            categoriesData.map((el) =>{
                Category.create({name: el.name})
            })
        }
        return allCategoriesDb
}

module.exports = Allcategories
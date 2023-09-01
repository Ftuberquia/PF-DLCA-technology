const {Category} = require ("../../db")

const Allcategories = async() => {
        const AllCategories = await Category.findAll()
        let allCategoriesDb = AllCategories.map((el)=> el.name)
        return allCategoriesDb
}

module.exports = Allcategories
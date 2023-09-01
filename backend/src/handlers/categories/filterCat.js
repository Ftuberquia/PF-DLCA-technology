const filterCategories = require ("../../controllers/categories/filterCategories")

const handlerFilterCat = async(req, res) =>{
    const {category, order} = req.query
    try{
        const categories = await filterCategories(category,order)
        return res.status(200).json(categories)
    } catch(error){
        return res.status(404).json({error: error.message})
    }
}

module.exports = handlerFilterCat
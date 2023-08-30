const getAllCategories = require ("../../controllers/categories/getAllCategories")

const getCateories = async (req, res) =>{
    try{
        const categories = await getAllCategories()
        return res.status(200).json(categories)
    } catch(error){
        return res.status(400).json({error: error.message})
    }
}

module.exports = getCateories
const  filterSubcategories = require ("../../controllers/subCategories/filterSubCategories")

const handlerFilterSubCat = async(req,res) =>{
    const {subcategory,order} = req.query
    try{
        const subCategories = await filterSubcategories(subcategory,order)
        return res.status(200).json(subCategories)
    } catch(error){
        return res.status(404).json({error: error.message})
    }
}

module.exports = handlerFilterSubCat
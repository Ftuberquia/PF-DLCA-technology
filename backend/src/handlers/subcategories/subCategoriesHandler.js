const getAllSubCategories = require ("../../controllers/subCategories/getAllSubCategories")

const getSubCategories = async (req, res) =>{
    try{
        const subCategories = await getAllSubCategories()
        return res.status(200).json(subCategories)
    } catch(error){
        return res.status(400).json({error: error.message})
    }
}

module.exports = getSubCategories
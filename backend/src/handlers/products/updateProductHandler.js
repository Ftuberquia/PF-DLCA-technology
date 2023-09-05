const updateProduct = require ("../../controllers/products/updateProduct");

const updateProductHandler = async (req, res) =>{
    const {id} = req.params
    const {name, imageSrc, price, stock, brand, category, subcategory, description, isActive, tags} = req.body
    try{
        const newProduct = await updateProduct(name, imageSrc, price, stock, brand, category, subcategory, description, isActive, tags, id)
        return res.status(200).json(newProduct)
    }catch(error){
        return res.status(400).json({error: error.message})
    }
}

module.exports = updateProductHandler
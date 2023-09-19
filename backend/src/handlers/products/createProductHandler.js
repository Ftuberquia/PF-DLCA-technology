const postCreateProduct = require ("../../controllers/products/postCreateProduct")

const postProduct = async (req, res) =>{
    const {name, imageSrc, price, stock, brand, category, subcategory, description} = req.body
    try{
        const newProduct = await postCreateProduct(name, imageSrc, price, stock, brand, category, subcategory, description)
        return res.status(200).json(newProduct)
    }catch(error){
        return res.status(400).json({error: error.message})
    }
}

module.exports = postProduct
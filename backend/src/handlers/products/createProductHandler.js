const postCreateProduct = require ("../../controllers/products/postCreateProduct")

const postProduct = async (req, res) =>{
    const {name, href, imageSrc, imageAlt, price, stock, brand, category, subcategory, rating, description, isActive, tags} = req.body
    try{
        const newProduct = await postCreateProduct(name, href, category, imageSrc, imageAlt, price, stock, brand, subcategory, rating, description, isActive, tags)
        return res.status(200).json(newProduct)
    }catch(error){
        return res.status(400).json({error: error.message})
    }
}

module.exports = postProduct
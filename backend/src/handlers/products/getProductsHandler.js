const getProducts = require ("../../controllers/products/getProducts")

const getProductsHandler = async (req, res) =>{
    try {
        const products = await getProducts()
        res.status(200).json(products)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

module.exports = getProductsHandler
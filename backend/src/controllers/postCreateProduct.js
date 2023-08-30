const Products = require('../models/products');

const postCreateProduct = async(req, res)=> {
    const { name, href, imageSrc, imageAlt, price, stock, brand, category, subCategory, rating, description } = req.body;
    try{
        const dbProduct = await Products.findOne({ where: { name: name }});
        if(dbProduct) {
            res.status(200).json({message: 'Ya existe un producto con ese nombre'});
        }
        else {
            const product = await Products.create({ name, href, imageSrc, imageAlt, price, stock, brand, category, subCategory, rating, description });
            res.status(200).json(product);
        }
    }
    catch(error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = postCreateProduct;
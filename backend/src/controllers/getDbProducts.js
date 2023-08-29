const productsData = require('../data');
const Products = require('../models/products');

const getDbProducts = async(req, res) => {
    try{
        productsData.map((product) => {
            Products.create({
                name: product.name,
                href: product.href,
                imageSrc: product.imageSrc,
                imageAlt: product.imageAlt,
                price: product.price,
                stock: product.stock,
                brand: product.brand,
                category: product.category,
                subCategory: product.subCategory,
                rating: product.rating,
                description: product.description
            })
        });
        res.status(200).json({message: 'Productos guardados en la base de datos correcto'});
    }
    catch(error){
        res.status(200).json({message: error.message});
    }
}

module.exports = getDbProducts;
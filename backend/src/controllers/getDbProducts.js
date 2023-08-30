const productsData = require('../utils/data');
const {Products} = require('../db');

const getDbProducts = async(req, res) => {
    try{
     await productsData.map((product) => {
            Products.create({
                name: product.name,
                href: product.href,
                imageSrc: product.imageSrc,
                imageAlt: product.imageAlt,
                price: product.price,
                stock: product.stock,
                brand: product.brand,
                category: product.category,
                subcategory: product.subcategory,
                rating: product.rating,
                description: product.description
            })
        });
        res.status(200).json({message: 'Productos guardados en la base de datos correcto'});
    }
    catch(error){
        res.status(400).json({message: error.message});
    }
}

module.exports = getDbProducts;
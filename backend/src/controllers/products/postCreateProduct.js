const {Products} = require('../../db');

const postCreateProduct = async(name, href, category, imageSrc, imageAlt, price, stock, brand, subcategory, rating, description, isActive)=> {
if (!name && !href && !category && !imageSrc && !imageAlt && !price && !stock && !brand && !subcategory && !rating && !description && !isActive){
    throw Error('Todos los campos son obligatorios')
}
let newProduct = await Products.create({name, href, imageSrc, imageAlt, price, stock, brand, category, subcategory, rating, description, isActive})
    return newProduct
}

module.exports = postCreateProduct;
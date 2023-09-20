const {Products, Tags, Brand, Category, Subcategory} = require('../../db');

const postCreateProduct = async(name, imageSrc, price, stock, brand, category, subcategory, description)=> {
    if (!name && !imageSrc && !price && !stock && !brand && !category && !subcategory && !description){
        throw Error('Todos los campos son obligatorios')
    }

    //busco los brands que coincidan con los ingresados
    
        const categoryDB = await Category.findOne({where:{name:category}})
        const subcategoryDb = await Subcategory.findOne({where:{name:subcategory}})
        const brandsDB = await Brand.findOne({where:{name:brand}})

    let newProduct = await Products.create({
        name, imageSrc, price, stock, brand, category, subcategory, description
    });

    return newProduct
}

module.exports = postCreateProduct;
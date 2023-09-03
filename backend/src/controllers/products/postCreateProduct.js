const {Products, Tags, Brand, Category, Subcategory} = require('../../db');

const postCreateProduct = async(name, href, category, imageSrc, imageAlt, price, stock, brand, subcategory, rating, description, isActive, tags)=> {
    if (!name && !href && !category && !imageSrc && !imageAlt && !price && !stock && !brand && !subcategory && !rating && !description && !isActive && !tags){
        throw Error('Todos los campos son obligatorios')
    }

    //busco los brands que coincidan con los ingresados
    const categoryDB=await Category.findAll({where:{name:category}})
    const subcategoryDb = await Subcategory.findAll({where:{name:subcategory}})
    const brandsDB=await Brand.findAll({where:{name:brand}})

    let newProduct = await Products.create({
        name, 
        href, 
        imageSrc, 
        imageAlt, 
        price, 
        stock, 
        brand, 
        category, 
        subcategory, 
        rating, 
        description, 
        isActive,
        categoryId:categoryDB[0].id,
        subcategoryId:subcategoryDb[0].id,
        brandsId:brandsDB[0].id,
        tags,
    });
    
    //busco los tags que coincidan con los ingresados por body
    const tagsDB=await Tags.findAll({
        where:{name:tags}
    })
    //asocio los tags con el modelo
    await newProduct.addTags(tagsDB)

    //Para obtener los datos de ambas tablas
    newProduct=await Products.findByPk(newProduct.id, {
        include:{
            model:Tags,
            attributes:['name'],
            through:{attributes:[]}
        }
    })

    return newProduct
}

module.exports = postCreateProduct;
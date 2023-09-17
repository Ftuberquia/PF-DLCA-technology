const {Products} = require ("../../db")

const getProducts = async () =>{
    const allProducts = await Products.findAll({
        attributes: ["imageSrc", "name", "stock", "isActive", "price", "rating"],
        order:[
            ["id", "ASC"]
        ]
    })
    return allProducts
}

module.exports = getProducts
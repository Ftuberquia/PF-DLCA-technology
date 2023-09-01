const {Products, Tags} = require('../../db')
const { Op } = require('sequelize');

const filterByBrand=async(brand, order)=>{

    if(!order) order='ASC';

    let filteredProducts = await Products.findAll({
        where: { brand: { [Op.iLike]: `%${brand}%` } },
        include:{
            model:Tags,
            attributes:['name'],
            through:{attributes:[]}
        },
        order: [['name', order]],
    })
    return filteredProducts;
}

module.exports=filterByBrand;
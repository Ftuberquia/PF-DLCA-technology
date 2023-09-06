
const {Products, Tags } = require('../../db')
const { Op } = require('sequelize');

const applyFilters = async (brand, subcategory, category) => {
      
  let whereClause = {}
    
    if (brand) {
        whereClause.brand = { [Op.iLike]: `%${brand}%` };
      }
      if (subcategory) {
        whereClause.subcategory = { [Op.iLike]: `%${subcategory}%` };
      }
      if (category) {
        whereClause.category = { [Op.iLike]: `%${category}%` };
      }


    let filteredProducts = await Products.findAll({
        where: whereClause,
        include:[
            {
                model:Tags,
                attributes:['name'],
                through:{attributes:[]}
            }
        ],
    })
    return filteredProducts;
}

module.exports = applyFilters
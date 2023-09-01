const {Products, Tags} = require('../../db')
const { Op } = require('sequelize');

const filterByTag=async(tags, order)=>{

    if(!order) order='ASC';

    let filteredProducts = await Products.findAll({
        include: [
          {
            model: Tags,
            where: { name: { [Op.iLike]: `%${tags}%` } },
            attributes: ['name'],
            through: { attributes: [] },
          },
        ],
        order: [['name', order]],
      });
      return filteredProducts;
}

module.exports=filterByTag;
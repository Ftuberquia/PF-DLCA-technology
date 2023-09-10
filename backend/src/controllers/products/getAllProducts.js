const {Products, Tags} = require('../../db')
const { Op } = require('sequelize');

const getAllProducts = async () => {
  const products = await Products.findAll({
    include:{
        model:Tags,
        attributes:['name'],
        through:{attributes:[]}
    }
});
  return products;
}

const getProductByName = async (name) => {
  let filteredProducts = await Products.findAll({
    where: { name: { [Op.iLike]: `%${name}%` } },
    include:{
      model:Tags,
      attributes:['name'],
       through:{attributes:[]}
    }
  })

  return filteredProducts;
};

module.exports = { getAllProducts, getProductByName };

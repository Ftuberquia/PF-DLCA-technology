const {Products, Tags } = require('../../db')
const { Op } = require('sequelize');

const applyFilters = async (brand, subcategory, category, page, order, priceOrder) => {
  const limit = 10; // Numero de elementos por pagina
  const offset = (page - 1) * limit; // Calcula el desplazamiento

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


      let filteredProducts;

      if (order) {
        filteredProducts = await Products.findAll({
          where: whereClause,
          limit,
          offset,
          order: [['name', order]],
          include: [
            {
              model: Tags,
              attributes: ['name'],
              through: { attributes: [] }
            }
          ],
        });
      } else if (priceOrder) {
        filteredProducts = await Products.findAll({
          where: whereClause,
          limit,
          offset,
          order: [['price', priceOrder]],
          include: [
            {
              model: Tags,
              attributes: ['name'],
              through: { attributes: [] }
            }
          ],
        });
      } else {
        filteredProducts = await Products.findAll({
          where: whereClause,
          limit,
          offset,
          include: [
            {
              model: Tags,
              attributes: ['name'],
              through: { attributes: [] }
            }
          ],
        });
      }
    return filteredProducts;
}

module.exports = applyFilters
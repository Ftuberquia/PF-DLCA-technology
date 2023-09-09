const {Products, Tags} = require('../../db')
const { Op } = require('sequelize');

const getAllProducts = async (page) => {
  const limit = 10; //Numero de elementos por pagina
  //page = page || 1;

    
  
    const offset = (page - 1) * limit; // Calcula el desplazamiento

    const products = await Products.findAll({
      limit,
      offset, // esto evita que se vuelvan a enviar los productos de la pagina anterior
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

const {Products, Tags} = require('../../db')
const { Op } = require('sequelize');

const getAllProducts = async (page, order, priceOrder) => {

  const limit = 10; //Numero de elementos por pagina

  const offset = (page - 1) * limit; // Calcula el desplazamiento

  let products
  
  if(order){
    products = await Products.findAll({
      limit,
      offset, // esto evita que se vuelvan a enviar los productos de la pagina anterior
      order: [['name', order]],
      include:{
        model:Tags,
        attributes:['name'],
        through:{attributes:[]}
      },
    });
  }else if(priceOrder){
    products = await Products.findAll({
      limit,
      offset, // esto evita que se vuelvan a enviar los productos de la pagina anterior
      order: [['price', priceOrder]],
      include:{
        model:Tags,
        attributes:['name'],
        through:{attributes:[]}
      },
    });
  }else{
    products = await Products.findAll({
      limit,
      offset, // esto evita que se vuelvan a enviar los productos de la pagina anterior
      include:{
        model:Tags,
        attributes:['name'],
        through:{attributes:[]}
      },
    });
  }
  return products;
}

const getProductByName = async (name, page) => {
  
  const limit = 10; //Numero de elementos por pagina

  const offset = (page - 1) * limit; // Calcula el desplazamiento

  let filteredProducts = await Products.findAll({
    limit,
    offset,
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

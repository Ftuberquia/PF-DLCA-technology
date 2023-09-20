const { PurchasedProduct, Products } = require('../../db')

const getProductsByUser = async (userId) => {
  try {

    const purchasedProducts = await PurchasedProduct.findAll({
        where: {
          userId: userId
        },
        include: [
          {
            model: Products,
            as: 'product'
          }
        ]
      });
  
      return purchasedProducts;
  } catch (error) {
    throw new Error('Error trayendo los productos comprados por el usuario de la base de datos', error);

  }
};

module.exports = { getProductsByUser };

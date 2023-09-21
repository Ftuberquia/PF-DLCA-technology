const { PurchasedProduct, Products, UserProductReviews } = require('../../db')

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
          },
          {
            model: UserProductReviews,
            as: 'reviews', // Alias para las reviews
            required: false // Permite que sea una relación opcional (left join)
          }
        ]
      });
  
      const productsWithReviews = purchasedProducts.map((product) => ({
        ...product.toJSON(),
        hasReviews: product.reviewsByUsers
      }));
  
      return productsWithReviews;

  } catch (error) {
    throw new Error('Error trayendo los productos comprados por el usuario de la base de datos', error);

  }
};

module.exports = { getProductsByUser };

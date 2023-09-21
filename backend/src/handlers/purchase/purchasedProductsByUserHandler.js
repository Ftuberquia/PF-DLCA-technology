const { getProductsByUser } = require('../../controllers/purchase/purchasedProductsByUserController');

const getPurchasedProductsByUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const purchasedProducts = await getProductsByUser(userId);
    res.json(purchasedProducts);
  } catch (error) {
    console.error('Error al obtener productos comprados por usuario:', error);
    res.status(500).json({ error: 'No se pudieron obtener los productos comprados' });
  }
};

module.exports = { getPurchasedProductsByUser };
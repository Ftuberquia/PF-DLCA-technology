const { Users, Products } = require('../../db');

const removeFavoriteProduct = async (req, res) => {
    try {
      const { userId, productId } = req.body;
  
      // Verifica si el usuario y el producto existen
      const user = await Users.findByPk(userId);
      const product = await Products.findByPk(productId);
  
      if (!user || !product) {
        return res.status(404).json({ message: 'Usuario o producto no encontrado' });
      }
  
      // Elimina la entrada de la tabla intermedia "favorites"
      await user.removeProduct(productId)
  
      return res.status(200).json({ message: 'Producto eliminado de favoritos' });
    
    } catch (error) {

      return res.status(400).json({ message: 'Error al eliminar el producto de favoritos', error });
    }
  };

module.exports = {
    removeFavoriteProduct
}
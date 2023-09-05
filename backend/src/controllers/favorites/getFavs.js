const { Users, Products, Favorites } = require('../../db');

const getFavoriteProducts=async(req, res)=>{
    try {
      const { userId } = req.params;
  
      // Verifica si el usuario existe
      const user = await Users.findByPk(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      // Obtiene los productos favoritos del usuario desde la tabla intermedia
      const favoriteProducts = await Favorites.findAll({
        where: { userId },
        include: { model: Products, as: 'products' },
      });

      //Si no hay productos favoritos en el usuario
      if(!favoriteProducts){
        return res.status(404).json({ message: 'No tienes productos favoritos' });
      }
  
      return res.status(200).json(favoriteProducts);

    } catch (error) {
        
      return res.status(400).json({ message: 'Error al obtener los productos favoritos', error });
    }
  };

module.exports = {
    getFavoriteProducts
}
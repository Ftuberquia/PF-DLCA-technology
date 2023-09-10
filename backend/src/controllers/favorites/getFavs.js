const { Users, Products } = require('../../db');

const getFavoriteProducts=async(req, res)=>{
    try {
      const { userId } = req.params;
  
      // Verifica si el usuario existe
      const user = await Users.findByPk(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      if(user===null){
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      // Obtiene los productos favoritos del usuario desde la tabla intermedia
      const favoriteProducts = await Users.findAndCountAll({
        where: { id: userId },
        include: [
          {
            model: Products,
            as: 'products',
            through: { attributes: [] }, // Evita incluir las columnas de la tabla intermedia en el resultado
            attributes:{exclude:['href','imageAlt','brand','category','subcategory','description','isActive','categoryId','subcategoryId','brandsId']}
          },
        ],
        attributes: { exclude: ['first_name', 'last_name', 'email', 'password', 'postal_code', 'address', 'phone']}
      });

      //Si no hay productos favoritos en el usuario
      if(favoriteProducts.rows[0].products.length===0){
        return res.status(200).json({ message: 'No tienes productos favoritos' });
      }
  
      return res.status(200).json(favoriteProducts.rows[0].products);

    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: 'Error al obtener los productos favoritos', error });
    }
  };

module.exports = getFavoriteProducts
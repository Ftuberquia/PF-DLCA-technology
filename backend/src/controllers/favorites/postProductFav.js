const { Users, Products } = require('../../db');

const saveFavoriteProduct = async (req, res) => {
  try {
    const { userId,  productId } = req.body;

    // Verifica si el usuario y el producto existen
    const user = await Users.findByPk(userId);
    const product = await Products.findByPk(productId);
    
    if (!user) {
        //encontrar forma de guardar el producto para que se pueda agregar una vez se loguee el usuario
        return res.status(404).json({ message: 'No estas logueado! Registrate o ingresa para agregar a favoritos' });
    }
    if(!product){
        return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Crea una nueva entrada en la tabla intermedia "favorites"
    await product.addUsers(user)

    return res.status(201).json({ message: 'Producto guardado como favorito' });
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: 'Error al guardar el producto favorito', error });
  }
};

module.exports = {
  saveFavoriteProduct,
};
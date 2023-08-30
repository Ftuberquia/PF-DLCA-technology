const productsData = require('../../utils/data');
const { Products, Category, Brand } = require('../../db');

const getDbProducts = async () => {
  try {
    // Esperar a que se carguen las categorías
    const categories = await Category.findAll();

    // Crear los productos en la base de datos junto con las categorías correspondientes
    await Products.bulkCreate(productsData, {
      individualHooks: true
    });

    console.log('Productos cargados exitosamente');
  } catch (error) {
    console.error('Error al cargar los productos:', error);
  }
};

module.exports = getDbProducts;
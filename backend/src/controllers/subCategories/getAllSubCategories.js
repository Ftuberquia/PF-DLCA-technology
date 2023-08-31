const { Subcategory } = require("../../db");

const AllSubCategories = async(categoryId) => {
  try {
    const subcategorias = await Subcategory.findAll({
      where: {
        categoryId: categoryId,
      },
    });

    subcategorias.map((subcategoria) => {
      subcategoria.dataValues.id = subcategoria.dataValues.id;
      subcategoria.dataValues.categoryId = subcategoria.dataValues.categoryId;
    });

    return subcategorias;
  } catch (error) {
    console.error("Error al obtener las subcategorías:", error);
    throw error;
  }
}

<<<<<<< HEAD
module.exports = AllSubCategories
=======
module.exports = AllSubCategories
>>>>>>> 51ffac2285cccea75b914f6b0838b123041c5366

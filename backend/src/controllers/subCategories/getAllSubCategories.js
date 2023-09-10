const { Subcategory } = require("../../db");
const subCategoriesData = require("../../utils/data");

const AllSubCategories = async () => {
  try {
    const subcategoriesDB = await Subcategory.findAll();

    const subcategoriesName = subcategoriesDB.map((el) => el.name);

    if (subcategoriesDB.length === 0) {
      const subcategories = subCategoriesData.map((el) => {
        return {
          name: el.subcategory,
        };
      });

      //Array para guardar las subcategorias
      let subcat = [];
      subcategories.forEach((element) => {
        if (!subcat.includes(element.name)) {
          subcat.push(element.name);
        }
      });

      subcat.map((subcate) => {
        Subcategory.create({
          name: subcate,
        });
      });

      return subcategoriesDB;
    }

    return subcategoriesName;
  } catch (error) {
    console.error("Error al obtener las subcategorías:", error);
    throw error;
  }
};

module.exports = AllSubCategories;

const productsData = require("../../utils/data");
const brandsData = require("../../utils/brands");
const tagsData = require("../../utils/tags");
const categoryData = require("../../utils/category");

const { Products, Category, Brand, Tags, Subcategory } = require("../../db");

const getDbProducts = async () => {
  const count = await Products.count();

  if (count === 0) {
    // Esperar a que se carguen las categorías, brands, subcategorias, tags y los crea
    const categories = await Promise.all(
      categoryData.map((el) => Category.create({ name: el.name }))
    );

    const subcategories = await Promise.all(
      (subcat = productsData.map((el) => {
        return { name: el.subcategory };
      }))
    );

    let sub = [];
    subcat.forEach((element) => {
      if (!sub.includes(element.name)) {
        sub.push(element.name);
      }
    });

    const createdSubcategories = await Promise.all(
      sub.map((el) => {
        return Subcategory.create({
          name: el,
        });
      })
    );

    const brands = await Promise.all(
      brandsData.map((b) => Brand.create({ name: b.name, logo: b.logo }))
    );

    const tagsEnDB = await Promise.all(
      tagsData.map((t) => Tags.create({ name: t }))
    );

    Promise.all([...categories, brands, tagsEnDB, createdSubcategories]);

    //Procede a realizarse la carga de los productos y las relaciones
    for (const product of productsData) {
      const category = categories.find((el) => el.name === product.category);
      const brand = brands.find((el) => el.name === product.brand);
      const subcategory = createdSubcategories.find(
        (el) => el.name === product.subcategory
      );

      if (category && brand) {
        let newProduct = await Products.create({
          ...product,
          categoryId: category.id,
          subcategoryId: subcategory.id,
          brandsId: brand.id,
        });
        const tags = await Tags.findAll({ where: { name: product.tags } });
        await newProduct.addTags(tags);
      }
    }
  }
};

module.exports = getDbProducts;

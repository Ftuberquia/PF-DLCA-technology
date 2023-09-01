const productsData = require('../../utils/data');
const brandsData=require('../../utils/brands');
const tagsData=require('../../utils/tags');
const categoryData=require('../../utils/category');

const {getAllProducts}=require('../../controllers/products/getAllProducts')

const { Products, Category, Brand, Tags, } = require('../../db');

const getDbProducts = async () => {
  const count=await Products.count();

  if(count===0) {// Esperar a que se carguen las categorías, brands, subcategorias, tags y los crea
    const categories = await Promise.all(
      categoryData.map((el) => Category.create({ name: el.name }))
    );

    //aca va el subcategory

    const brands = await Promise.all(
      brandsData.map((b) => Brand.create({ name: b.name, logo: b.logo }))
    );
    
    const tagsEnDB = await Promise.all(
      tagsData.map((t) => Tags.create({ name: t }))
    );

    Promise.all([...categories,brands,tagsEnDB])

    //Procede a realizarse la carga de los productos y las relaciones
    for (const product of productsData){
      const category = categories.find((el)=> el.name ===product.category)
      const brand = brands.find((el) => el.name === product.brand) 

      if(category && brand){
        let newProduct=await Products.create({
          ...product,
          categoryId: category.id,
          //aca va el subcategory
          brandsId : brand.id,
        })
        const tags=await Tags.findAll({where:{name:product.tags}})
        await newProduct.addTags(tags)
      }
    }}
};

module.exports = getDbProducts;
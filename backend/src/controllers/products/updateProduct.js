// controllers/updateProduct.js
const {Products, Tags, Brand, Category, Subcategory} = require("../../db");


const updateProduct = async (name, imageSrc, price, stock, brand, category, subcategory, description, isActive, tags, id) => {
  let updates = {}
  const product = await Products.findOne({where:{ id: id}})
  
  if(brand){
    const [brands] = await Brand.findOrCreate({ where: { name: brand } });
    if(brand !== undefined || brand !== "") {
      updates.brandsId = brands.id;
      updates.brand=brands.name;
    }
  }
  if(category){
    const [categories] = await Category.findOrCreate({where: {name: category}})
    if(category !== undefined || category !== "") {
      updates.categoriesId = categories.id;
      updates.category=categories.name;
  }
}
  if(subcategory){
    const [subcategories] = await Subcategory.findOrCreate({where: {name: subcategory}})  
    if(subcategory !== undefined || subcategory !== "") {
      updates.subcategoriesId = subcategories.id
      updates.subcategory= subcategories.name
    }
  }
  
   
    // Actualiza los atributos del producto: 
    
    if(name !== undefined || name !== "") {
      updates.name = name;
    }
    if(imageSrc !== undefined || imageSrc !== "") {
      updates.imageSrc = imageSrc;
    }
    if(price !== undefined && price !== null) {
      updates.price = price;
    }
    if(stock !== undefined) {
      updates.stock = stock;
    }  
    if(description !== undefined || description !== "") {
      updates.description = description;
    }
    if (isActive !== undefined) {
      updates.isActive = isActive;
    }// Agregar el valor de isActive
    
    await product.update(updates);

    if(tags){
      await product.setTags([])
      let postTags = await Tags.findAll({where :{name:tags}})
      await product.addTags(postTags)
    }
    return product
  }
;

module.exports = updateProduct;

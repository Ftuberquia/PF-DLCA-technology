const { CartProduct, Cart, Products } = require("../../db");

//Agrega un producto a la tabla intermedia
const postProduct = async ( userId, productId, quantity_prod) => {

  // const cId=parseInt(cartId);
  const pId=parseInt(productId);

  if (!quantity_prod) {
    throw Error("El campo es obligatorio");
  }

  try {
    const cart = await Cart.findOne({where:{userId:userId}});
    const product=await Products.findByPk(pId);

    if (!cart) {
      throw Error("El carrito no existe");
    }
    
    if(!product){
      throw Error("El producto no existe");
    }


    const priceProduct=product.price
    const totalPriceProduct=quantity_prod*priceProduct

    //crear la nueva entrada de producto en el carrito
    const newCartProduct = await CartProduct.create({
      cartId:cart.id,
      productId:pId,
      quantity_prod,
      total_price_product:totalPriceProduct
    })

    //Obtenemos todos los productos asociados al carrito
    const allProducts=await CartProduct.findAll({
      where:{
        cartId:cart.id
      },
    })

    //Calculamos la suma de todos los productos asociados al carrito
    const productsSuma=allProducts.reduce((sum,prod)=>sum+prod.quantity_prod,0)

    //Calculamos la suma total de todos los productos asociados al carrito
    const totalPrice=allProducts.reduce((sum,prod)=>sum+prod.total_price_product,0)

    //Actualizamos la cantidad de productos totales del carrito
    await cart.update({quantity: productsSuma, total_precio: totalPrice})

    return newCartProduct;

  } catch (error) {
    console.error("Error al agregar producto en el carrito:", error);
    throw error
  }
};

module.exports = postProduct;
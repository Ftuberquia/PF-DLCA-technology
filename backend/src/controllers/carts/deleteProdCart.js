const { CartProduct, Cart } = require("../../db");

const deleteProdCart = async (productId, userId) => {

  const pId=parseInt(productId);

  const cart= await Cart.findOne({where:{userId:userId}})

  const product = await CartProduct.findOne({
    where:{
      productId:pId,
      cartId:cart.id
    }
  })
  
  if(!product){
    throw Error('No se encontro el producto a eliminar')
  }

  await product.destroy()

   // Obtener el carrito actualizado
   const updatedCart = await Cart.findByPk(cart.id);
   console.log('id',cart.id)

   // Calcular el precio total y la cantidad total actualizados
   const allProducts = await CartProduct.findAll({
     where: { cartId: cart.id },
   });
 
   //Calculamos la suma de todos los productos asociados al carrito
   const productsSuma=allProducts.reduce((sum,prod)=>sum+prod.quantity_prod,0)

   //Calculamos la suma total de todos los productos asociados al carrito
   const totalPrice=allProducts.reduce((sum,prod)=>sum+prod.total_price_product,0)

   //Actualizamos la cantidad de productos totales del carrito
   await cart.update({quantity: productsSuma, total_precio: totalPrice})
};

module.exports = deleteProdCart;

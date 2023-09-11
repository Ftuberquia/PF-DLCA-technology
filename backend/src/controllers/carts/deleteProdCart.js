const { CartProduct } = require("../../db");

const deleteProdCart = async (productId, cartId) => {
  const product = await CartProduct.findOne({
    where:{
      productId,
      cartId
    }
  })
  
  if(!product){
    throw Error('No se encontro el producto a eliminar')
  }

  await product.destroy()
};

module.exports = deleteProdCart;

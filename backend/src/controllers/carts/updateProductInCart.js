const {CartProduct}=require('../../db')

const updateProductInCart = async (quantity, total_precio,pagado,cartId, productId) => {
  let cartProduct = await CartProduct.findOne({
    where: { CartId: cartId, ProductId: productId },
  });

  let updates = {};
  if (quantity !== undefined || quantity !== 0) {
    updates.quantity = quantity;
  }
  if (total_precio !== undefined || total_precio !== 0) {
    updates.total_precio = total_precio;
  }
  if (pagado !== undefined) {
    updates.pagado = pagado;
  }
  await cartProduct.update(updates);

  return cartProduct;
};
module.exports=updateProductInCart
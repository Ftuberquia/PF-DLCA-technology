const {Cart}=require('../../db')

//Modifica el carrito general. El quantity es la cantidad de productos totales dentro del carrito
//Devuelve los datos: cantidad de productos dentro del carrito, si esta pagado o no, y el precio total de la compra actualizados
const updateProductInCart = async (pagado,cartId) => {

  let cart = await Cart.findByPk(cartId)

  if (!cart) {
    throw Error('No hay usuario o carrito')
  }

  let updates = {};
 
  if (pagado !== undefined) {
    updates.pagado = pagado;
  }

  await cart.update(updates);

  return cart;
};
module.exports=updateProductInCart
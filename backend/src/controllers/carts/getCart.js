const { Cart, CartProduct } = require("../../db");

const getCart = async (userId) => {

  if (!userId) {
    throw Error("El id del usuario es obligatorio");
  }

  const cart = await Cart.findOne({
    where: {
      userId,
      },
    
  });

  const infoCart=await CartProduct.findAll({
    where:{
      cartId:cart.id
    },
  });

  let infoCarritoCompleta=[cart,infoCart]

 return infoCarritoCompleta
};

module.exports = getCart
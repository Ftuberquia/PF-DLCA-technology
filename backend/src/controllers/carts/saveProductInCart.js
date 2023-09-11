const { CartProduct, Cart, Products } = require("../../db");

//Agrega un producto a la tabla intermedia
const postProduct = async (
  cartId,
  productId,
  quantity_prod
) => {
  if (!quantity_prod) {
    throw Error("El campo es obligatorio");
  }

  try {
    const user = await Cart.findByPk(cartId);
    const product=await Products.findByPk(productId);
    if(!product){
      throw Error("El producto no existe");
    }

    //verificamos si el usuario tiene un carrito activo y que este aun esta abierto
    if((user && user.pagado===false)){
      throw Error("El usuario no tiene un carrito activo");
    }//revisar esto

    //crear la nueva entrada de producto en el carrito
    const newCartProduct = await CartProduct.create({
      cartId: cartId,
      productId: productId,
      quantity_prod
    })

    return newCartProduct;

  } catch (error) {
    console.error("Error al agregar producto en el carrito:", error);
    throw error
  }
};

module.exports = postProduct;
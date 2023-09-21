const { CartProduct, Cart, Products }=require('../../db')
const updateProductInCart = require('./updateProductInCart')

//Modifica la cantidad de un mismo producto, es para los botones + y - dentro del carrito
const updateQuantityProduct=async(quantity_prod, userId, productId)=>{

    const cart= await Cart.findOne({where:{userId:userId}})
    
    const productInCart=await CartProduct.findOne({
        where:{
            cartId: cart.id,
            productId
        }
    })

    const product=await Products.findOne({where:{id:productId}})

    if(!productInCart){
        throw new Error('Producto no encontrado dentro del carrito')
    }

    let updates={}

    if(quantity_prod!==undefined||quantity_prod!==0){
        updates.quantity_prod=quantity_prod
    }

    let totalProducto=quantity_prod*product.price
    updates.total_price_product=totalProducto

    await productInCart.update(updates)

     // Obtener el carrito actualizado
    const updatedCart = await Cart.findByPk(cart.id);

    // Calcular el precio total y la cantidad total actualizados
    const productsInCart = await CartProduct.findAll({
        where: { cartId: cart.id },
    });

    let precioTotal = 0;
    let cantidadTotal = 0;

    productsInCart.forEach((product) => {
        precioTotal += product.total_price_product;
        cantidadTotal += product.quantity_prod;
    });

    // Actualizar los valores de precioTotal y cantidadTotal en el carrito
    await updatedCart.update({ total_precio:precioTotal, quantity:cantidadTotal });

    return productInCart
}

module.exports=updateQuantityProduct
const { CartProduct }=require('../../db')

//Modifica la cantidad de un mismo producto, es para los botones + y - 

const updateQuantityProduct=async(quantity_prod, cartId, productId)=>{
    
    const productInCart=await CartProduct.findOne({
        where:{
            cartId,
            productId
        }
    })

    if(!productInCart){
        throw new Error('Producto no encontrado dentro del carrito')
    }

    let updates={}

    if(quantity_prod!==undefined||quantity_prod!==0){
        updates.quantity_prod=quantity_prod
    }

    await productInCart.update(updates)

    return productInCart
}

module.exports=updateQuantityProduct
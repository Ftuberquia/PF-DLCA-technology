const {Cart}=require('../../db')

const getIdCart=async(userId)=>{
    const cart=await Cart.findOne({where:{userId}})

    return cart.id
}

module.exports=getIdCart;
const { Cart } = require('../../db')

const clearCart = async (userId) => {
    const cart=await Cart.findOne({where:{
        userId:userId
    }})

    if(cart){
        let updates={
            quantity:0,
            totalPrice:0,
            pagado:false
        };
        await cart.update(updates);
    };
    return cart;
};

module.exports = clearCart
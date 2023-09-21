const clearCart = require('../../controllers/carts/clearCart')

const clearCartHandler=async(req,res)=>{
    const {userId}=req.params
    try {
        const cartLimpio= await clearCart(userId);
        res.status(200).json(cartLimpio)
    } catch (error) {
        res.status(400).json({ message: error.message });
    };
};

module.exports=clearCartHandler
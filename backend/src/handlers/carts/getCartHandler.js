const getCart = require('../../controllers/carts/getCart')

const getCartHandler=async(req,res)=>{
    const {userId}=req.params
    try {
        const cart=await getCart(userId);
        res.status(200).json(cart);
    } catch (error){
        console.log(error)
        res.status(500).json(error)
    }
}

module.exports = getCartHandler
const getTotalPriceCart = require('../../controllers/carts/getTotalPriceCart')

const getTotalPriceCartHandler=async(req,res)=>{
    const {cartId}=req.params
    try {
        const totalPrice=await getTotalPriceCart(cartId);
        res.status(200).json(totalPrice);
    } catch (error){
        console.log(error)
        res.status(500).json(error)
    }
}

module.exports = getTotalPriceCartHandler
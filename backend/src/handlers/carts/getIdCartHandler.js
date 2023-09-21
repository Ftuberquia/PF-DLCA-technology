const getIdCart=require('../../controllers/carts/getIdCart')

const getIdCartHandler=async (req,res)=>{
    const {userId}=req.params
    try {
        const cartId= await getIdCart(userId)
        res.status(200).json(cartId)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

module.exports=getIdCartHandler
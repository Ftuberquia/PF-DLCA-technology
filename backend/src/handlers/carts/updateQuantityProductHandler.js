const updateQuantityProduct=require('../../controllers/carts/updateQuantityProduct')

const updateQuantityProductHandler=async(req,res)=>{
    const {cartId , productId}=req.params
    const {quantity_prod}=req.body
    
    try {
        const prodActualizado=await updateQuantityProduct(quantity_prod, cartId, productId)
        res.status(200).json(prodActualizado)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

module.exports=updateQuantityProductHandler
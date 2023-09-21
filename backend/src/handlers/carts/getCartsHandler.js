const getIdCart=require('../../controllers/carts/getIdCart')

const getCartsDB=async(req,res)=>{
    const {cartId}=req.params
    try {
        //traigo todos los carts
        const carts=await getIdCart(cartId);
        res.status(200).json(carts);
    } catch (error) {
        res.status(400).json({message: error.message});
    };
};

module.exports=getCartsDB;
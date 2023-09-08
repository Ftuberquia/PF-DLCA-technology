const getCarts=require('../../controllers/carts/getAllCarts')

const getCartsDB=async(req,res)=>{
    try {
        //traigo todos los carts
        const carts=await getCarts();
        res.status(200).json(carts);
    } catch (error) {
        res.status(400).json({message: error.message});
    };
};

module.exports=getCartsDB;
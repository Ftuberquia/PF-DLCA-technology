
const filterByCart=require('../../controllers/carts/filterCart')

const getFilterByCart=async(req,res)=>{

    try {
        const {cart}=req.query;
        //traigo el Carts por id
        const carts=await filterByCart(cart);
        res.status(200).json(carts);
    } catch (error) {
        res.status(400).json({message: error.message});
    };
};

module.exports=getFilterByCart;
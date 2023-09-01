const filterByBrand=require('../../controllers/brand/filterBrands')

const getFilterByBrand=async(req,res)=>{
    const {brand, order}=req.query;

    try {
        const filteredProducts = await filterByBrand(brand, order);
        return res.status(200).json(filteredProducts);
    } catch(error){
        return res.status(400).json({error: error.message});
    }
}

module.exports=getFilterByBrand;
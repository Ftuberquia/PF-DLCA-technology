const getBrands=require('../../controllers/brand/getAllBrands')

const getBrandsDB=async(req,res)=>{
    try {
        //traigo todos los brands
        const brands=await getBrands();
        res.status(200).json(brands);
    } catch (error) {
        res.status(400).json({message: error.message});
    };
};

module.exports=getBrandsDB;
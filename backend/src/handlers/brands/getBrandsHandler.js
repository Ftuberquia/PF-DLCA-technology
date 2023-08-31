const getBrands=require('../../controllers/brand/getAllBrands')

const getBrandsDB=async(req,res)=>{
    try {
<<<<<<< HEAD
        //traigo todos los tags
=======
        //traigo todos los brands
>>>>>>> 51ffac2285cccea75b914f6b0838b123041c5366
        const brands=await getBrands();
        res.status(200).json(brands);
    } catch (error) {
        res.status(400).json({message: error.message});
    };
};

module.exports=getBrandsDB;
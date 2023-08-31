const {Brand}=require('../../db')
<<<<<<< HEAD
const brandsData=require('../../utils/bags')
=======
const brandsData=require('../../utils/brands')
>>>>>>> 51ffac2285cccea75b914f6b0838b123041c5366

const getBrands=async()=>{
    //Verifico si los brands están en la DB y los guardo
    let brandsDB= await Brand.findAll();
<<<<<<< HEAD
    
    //Si no hay brands en la DB
    if(brandsDB.length===0){
        brandsData.map(b=>{
            Tags.create({
=======
    //Retorno los name y logos de las brands de la DB
    let brands=brandsDB.map(el=>({
        name:el.name,
        logo:el.logo
    }))

    //Si no hay brands en la DB
    if(brandsDB.length===0){
        brandsData.map(b=>{
            Brand.create({
>>>>>>> 51ffac2285cccea75b914f6b0838b123041c5366
                name:b.name,
                logo:b.logo
            });
        });
<<<<<<< HEAD
        //Busco los brands de vuelta y los guardo
        brandsDB= await Brand.findAll();
    };

    //Retorno los name brands de la DB
    return brandsDB;
=======
    };

    return brands;
>>>>>>> 51ffac2285cccea75b914f6b0838b123041c5366
}

module.exports=getBrands;
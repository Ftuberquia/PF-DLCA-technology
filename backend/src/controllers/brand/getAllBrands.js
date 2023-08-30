const {Brand}=require('../../db')
const brandsData=require('../../utils/bags')

const getBrands=async()=>{
    //Verifico si los brands están en la DB y los guardo
    let brandsDB= await Brand.findAll();
    
    //Si no hay brands en la DB
    if(brandsDB.length===0){
        brandsData.map(b=>{
            Tags.create({
                name:b.name,
                logo:b.logo
            });
        });
        //Busco los brands de vuelta y los guardo
        brandsDB= await Brand.findAll();
    };

    //Retorno los name brands de la DB
    return brandsDB;
}

module.exports=getBrands;
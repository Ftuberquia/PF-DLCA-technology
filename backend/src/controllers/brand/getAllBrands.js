const {Brand}=require('../../db')
const brandsData=require('../../utils/brands')

const getBrands=async()=>{
    //Verifico si los brands están en la DB y los guardo
    let brandsDB= await Brand.findAll();
    //Retorno los name y logos de las brands de la DB
    let brands=brandsDB.map(el=>({
        name:el.name,
        logo:el.logo
    }))

    //Si no hay brands en la DB
    if(brandsDB.length===0){
        brandsData.map(b=>{
            Brand.create({
                name:b.name,
                logo:b.logo
            });
        });
    };

    return brands;
}

module.exports=getBrands;
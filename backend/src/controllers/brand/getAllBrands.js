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

    return brands;
}

module.exports=getBrands;
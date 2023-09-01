const {Tags}=require('../../db')
const tagsData=require('../../utils/tags')

const getAllTags=async()=>{
    //Verifico si los tags están en la DB
    let tagsDB= await Tags.findAll();

    //Extraigo solo los nombres y los guardo en un array
    const allTags=tagsDB.map(el=>el.name);

    //Retorno los tags de la DB
    return allTags;
}

module.exports=getAllTags;
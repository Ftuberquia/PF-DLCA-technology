const {Tags}=require('../../db')
const tagsData=require('../../utils/tags')

const getAllTags=async()=>{
    //Verifico si los tags están en la DB
    const tagsDB= await Tags.findAll();
     
    //Extraigo solo los nombres y los guardo en un array
    const allTags=tagsDB.map(el=>el.name);

    //Si no hay tags en la DB
    if(tagsDB.length===0){
        tagsData.map(t=>{
            Tags.create({
                name:t
            });
        });
    };
    //Retorno los tags de la DB
    return allTags;
}

module.exports=getAllTags;
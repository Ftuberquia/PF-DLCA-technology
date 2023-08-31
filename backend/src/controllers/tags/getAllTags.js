const {Tags}=require('../../db')
const tagsData=require('../../utils/tags')

const getAllTags=async()=>{
    //Verifico si los tags están en la DB
<<<<<<< HEAD
    const tagsDB= await Tags.findAll();
     
    //Extraigo solo los nombres y los guardo en un array
    const allTags=tagsDB.map(el=>el.name);

=======
    let tagsDB= await Tags.findAll();
     
>>>>>>> 51ffac2285cccea75b914f6b0838b123041c5366
    //Si no hay tags en la DB
    if(tagsDB.length===0){
        tagsData.map(t=>{
            Tags.create({
                name:t
            });
        });
    };
<<<<<<< HEAD
=======

    //Extraigo solo los nombres y los guardo en un array
    const allTags=tagsDB.map(el=>el.name);

>>>>>>> 51ffac2285cccea75b914f6b0838b123041c5366
    //Retorno los tags de la DB
    return allTags;
}

module.exports=getAllTags;
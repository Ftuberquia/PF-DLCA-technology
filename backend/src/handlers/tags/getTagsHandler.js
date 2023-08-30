const getAllTags=require('../../controllers/tags/getAllTags')

const getTagsDB=async(req,res)=>{
    try {
        //traigo todos los tags
        const tags=await getAllTags();
        res.status(200).json(tags);
    } catch (error) {
        res.status(400).json({message: error.message});
    };
};

module.exports=getTagsDB;
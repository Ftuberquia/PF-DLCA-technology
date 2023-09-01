const filterByTag=require('../../controllers/tags/filterTags')

const getFilterByTag=async(req,res)=>{
    const {tags, order}=req.query;

    try {
        const filteredProducts = await filterByTag(tags, order);
        return res.status(200).json(filteredProducts);
    } catch(error){
        return res.status(400).json({error: error.message});
    }
}

module.exports=getFilterByTag;
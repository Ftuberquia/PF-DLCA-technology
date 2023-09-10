const {Products, Tags} = require('../../db')

const getProductDetail = async (id) => {
    const detail=await Products.findByPk(id,{include:{
        model:Tags,
        attributes:['name'],
        through:{attributes:[]}
    }});
    
    if(!detail){
        throw Error('no existe este producto')
    }
    return detail
}

module.exports = getProductDetail;
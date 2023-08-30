const {Products} = require('../../db')

const getProductDetail = async (id) => {
    const detail=await Products.findByPk(id)
    if(!detail){
        throw Error('no existe este producto')
    }
    return detail
}

module.exports = getProductDetail;
const {Products, Tags} = require ("../../db")
const {Op} = require ("sequelize")

const filterCategories = async(category,order) =>{

    if(!order) order='ASC'

    const filter = await Products.findAll(
        {where: {category:{[Op.iLike]: `%${category}%`} },
        include:{
            model:Tags,
            attributes:['name'],
            through:{attributes:[]}
        },
    order: [['name', order]],}
    )
    return filter
}

module.exports = filterCategories




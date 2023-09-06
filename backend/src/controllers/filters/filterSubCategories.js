const {Products, Tags} = require ("../../db")
const {Op} = require ("sequelize")

const filterSubcategories = async(subcategory,order) =>{

    if(!order) order='ASC'

    const filter = await Products.findAll(
        {where: {subcategory:{[Op.iLike]: `%${subcategory}%`} },
        include:{
            model:Tags,
            attributes:['name'],
            through:{attributes:[]}
        },
    order: [['name', order]],}
    )
    return filter
}

module.exports = filterSubcategories
const {Cart} = require('../../db')
const { Op } = require('sequelize');

const filterByCart=async(cart)=>{

    if(!order) order='ASC';

    let filteredCarts = await Cart.findAll({
        where: { cart: { [Op.iLike]: `%${cart}%` } },
        include:{
            model:Tags,
            attributes:['name'],
            through:{attributes:[]}
        },
        order: [['name', order]],
    })
    return filteredCarts;
}

module.exports=filterByCart;
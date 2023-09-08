const {Cart} = require ("../../db")

const Allcarts = async() => {
        console.log("carts");
        const AllCarts = await Cart.findAll()
        
        let allCartsDb = AllCarts.map((el)=> el.id)
        return allCartsDb
}

module.exports = Allcarts
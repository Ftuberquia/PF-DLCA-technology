// const { stripe } = require('stripe');

// const { Buy } = require("../../db");

// const getAllCompras = async () => {
//   const compras = await stripe.findAll({
//     include:{
        
//         through:{attributes:[]}
//     }
// });
//   return products;
// }

// const getAllCompra = async (req, res) => {
//     const {id} = req.params
//     try{
//             const response = await getCompra(id)
//             return res.status(200).json(response)
//     }catch(error){
//         return res.status(400).json({error: error.message})
//     }

// };

// module.exports = { getAllCompras };
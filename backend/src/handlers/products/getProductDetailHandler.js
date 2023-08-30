const getProductDetail = require('../../controllers/products/getProductDetail')

// Handler que muestra el detail a partir de su id
const getDetailHandler = async (req, res) => {
    const {id} = req.params
    try{
            const response = await getProductDetail(id)
            return res.status(200).json(response)
    }catch(error){
        return res.status(400).json({error: error.message})
    }

};

module.exports = { getDetailHandler };
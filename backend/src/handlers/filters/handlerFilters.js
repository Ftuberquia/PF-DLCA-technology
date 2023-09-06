const applyFilters = require ("../../controllers/filters/filtroComplejo")

const handlerFilter = async(req, res) => {
    const {brand, subcategory, category, tags} = req.query
    try{
        const filteredProducts = await applyFilters(brand, subcategory, category, tags)
        return res.status(200).json(filteredProducts)
    }
    catch(error){
        return res.status(400).json({error: error.message})
    }

}

module.exports = handlerFilter

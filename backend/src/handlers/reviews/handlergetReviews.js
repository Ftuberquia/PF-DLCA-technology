const getReviews = require ("../../controllers/reviews/getReviews")
const handlerGetReviews = async(req, res) => {
        const { productId } = req.params;
    try {
        const reviews = await getReviews(productId) 
        return res.status(200).json(reviews);
    }
    catch(error){
        return res.status(500).json({ error: error.message });
    }

}

module.exports = handlerGetReviews;

const postReviews = require ("../../controllers/reviews/postReview")
const handlerpostReviews = async(req, res) => {
    const { productId } = req.params;
    const { comment, rating, userId } = req.body;

try {
        const newReview = await postReviews(comment, rating, productId, userId )
    return res.status(200).json({ message: "Reseña creada con éxito", newReview });
    }
    catch(error){
        return res.status(500).json({ error: error.message });
    }
}

module.exports = handlerpostReviews;
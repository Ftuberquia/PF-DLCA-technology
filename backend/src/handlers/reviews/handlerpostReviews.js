const postReviews = require ("../../controllers/reviews/postReview")
const handlerpostReviews = async(req, res) => {
    const productId = parseInt(req.params.productId);
    const { comment, rating, userId, userEmail } = req.body;

try {
        const newReview = await postReviews(userId, productId, comment, rating, userEmail)
    return res.status(200).json({ message: "Reseña creada con éxito", newReview });
    }
    catch(error){
        return res.status(500).json({ error: error.message });
    }
}

module.exports = handlerpostReviews;
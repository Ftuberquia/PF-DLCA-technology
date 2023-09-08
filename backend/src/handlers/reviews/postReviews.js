const { UserProductReviews } = require("../../db"); // Asegúrate de que la ruta sea correcta

const postReviews = async(req, res) => {
    const { productId } = req.params;
    const { comment, rating } = req.body; 

try {
        const newReview = await UserProductReviews.create({
            productId,
            comment,
            rating,
            userId
        });

    return res.status(200).json({ message: "Reseña creada con éxito", newReview });
    }
    catch(error){
        return res.status(500).json({ error: error.message });
    }
}

module.exports = postReviews;
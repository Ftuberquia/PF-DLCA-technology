const getAllReviews = require("../../controllers/reviews/getAllReviews");

const handlerGetAllReviews = async(req, res) => {

    try {
        const reviews = await getAllReviews()
        return res.status(200).json(reviews);
    }
    catch(error){
        return res.status(500).json({ error: error.message });
    }

}

module.exports = handlerGetAllReviews;
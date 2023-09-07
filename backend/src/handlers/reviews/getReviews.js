
const getReviews = async(req, res) => {
        const { productId } = req.params;
    try {
        const reviews = await UserProductReviews.findAll({ where: { productId } });
        return res.status(200).json(reviews);
    }
    catch(error){
        return res.status(500).json({ error: error.message });
    }

}

module.exports = getReviews;

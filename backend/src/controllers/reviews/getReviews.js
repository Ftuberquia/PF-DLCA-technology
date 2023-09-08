const {UserProductReviews} = require ("../../db")

const getReviews = async(productId) => {
    const reviews = await UserProductReviews.findAll({
        where: { productId }
    })
    return reviews
}

module.exports = getReviews

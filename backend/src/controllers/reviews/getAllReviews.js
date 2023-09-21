const { UserProductReviews } = require ("../../db")

const getAllReviews = async () => {
    const reviews = await UserProductReviews.findAll()
    return reviews
}

module.exports = getAllReviews
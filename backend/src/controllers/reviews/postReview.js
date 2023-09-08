const { UserProductReviews } = require("../../db")

const postReviews = async(productId, comment, rating, userId) =>{
    if(!rating || !comment || !userId){
        throw Error('Todos los campos son obligatorios')
    }
    const newReview = await UserProductReviews.create({
        productId,
        comment,
        rating,
        userId: parseInt(userId)
    })
    return newReview
}

module.exports = postReviews
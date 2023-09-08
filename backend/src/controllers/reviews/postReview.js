const { UserProductReviews } = require("../../db")

const postReviews = async(productId, comment, rating, userId) =>{
    if(!rating && !comment){
        throw Error('Todos los campos son obligatorios')
    }
    const newReview = await UserProductReviews.create({
        comment,
        rating,
    })
    return newReview
}

module.exports = postReviews
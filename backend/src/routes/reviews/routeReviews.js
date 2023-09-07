const {Router} = require ("express")
const  getReviews  = require("../../handlers/reviews/getReviews")
const postReviews = require("../../handlers/reviews/postReviews")

const reviews = Router()

//Para mostrar las reviews de un producto
reviews.get("/:productId", getReviews);

// Para postear una review de un producto
reviews.post("/:productId", postReviews);

module.exports = reviews;
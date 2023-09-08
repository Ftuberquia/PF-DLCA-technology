const {Router} = require ("express")
const  handlergetReviews  = require("../../handlers/reviews/handlergetReviews")
const handlerpostReviews = require("../../handlers/reviews/handlerpostReviews")

const reviews = Router()

//Para mostrar las reviews de un producto
reviews.get("/:productId", handlergetReviews);

// Para postear una review de un producto
reviews.post("/:productId", handlerpostReviews);

module.exports = reviews;
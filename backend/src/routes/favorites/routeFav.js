const {Router} = require ("express")
const { getFavorite, saveFavorite, deleteFavorite } = require("../../handlers/favorites/favoritesHandler")

const favorites = Router()

//Para mostrar los fav de un usuario
favorites.get("/:userId", getFavorite);

//Para agregar favs
favorites.post('/addFav/:userId/:productId', saveFavorite);

//Para eliminar de fav un producto
favorites.delete('/delFav/:userId/:productId', deleteFavorite);

module.exports = favorites
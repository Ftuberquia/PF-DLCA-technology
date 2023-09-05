const {Router} = require ("express")
const { getFavorite, saveFavorite, deleteFavorite } = require("../../handlers/favorites/favoritesHandler")

const favorites = Router()

//Para mostrar los fav de un usuario
favorites.get("/", getFavorite);

//Para agregar favs
favorites.post('/', saveFavorite);

//Para eliminar de fav un producto
favorites.delete('/', deleteFavorite);

module.exports = favorites
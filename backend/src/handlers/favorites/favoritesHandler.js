const {saveFavoriteProduct}=require('../../controllers/favorites/postProductFav')
const {removeFavoriteProduct}=require('../../controllers/favorites/deleteProductFav');
const getFavoriteProducts = require('../../controllers/favorites/getFavs');


const saveFavorite=async(req,res)=>{
    try {
        await saveFavoriteProduct(req, res);
    } catch (error) {
        return res.status(500).json({ message: 'Error en el handler para guardar el producto favorito', error });
    }
}

const getFavorite=async(req,res)=>{
    try {
        await getFavoriteProducts(req, res);
    } catch (error) {
        return res.status(500).json({ message: 'Error en el handler para traer los favoritos', error });
    }
}

const deleteFavorite=async(req,res)=>{
    try {
        await removeFavoriteProduct(req, res);
    } catch (error) {
        return res.status(500).json({ message: 'Error en el handler para eliminar el producto de favoritos', error });
    }
}

module.exports={
    saveFavorite,
    getFavorite,
    deleteFavorite
}
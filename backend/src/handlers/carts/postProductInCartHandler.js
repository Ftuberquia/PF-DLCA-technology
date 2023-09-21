const postProductInCartController = require("../../controllers/carts/postProductInCartController");

const postProductInCartHandler = async (req, res) => {
    try {
        await postProductInCartController(req, res)
    } catch (error) {
        console.log(error);
      // Si se produce un error, devuelve una respuesta de error 500 (error interno del servidor)
      return res.status(500).json(error.message);
    }
  };
  
  module.exports = postProductInCartHandler;
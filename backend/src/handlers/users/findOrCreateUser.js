const findOrCreateUserController = require("../../controllers/users/findOrCreateUserController");

const findOrCreateUserHandler = async (req, res) => {

    try {
        const result = await findOrCreateUserController(req.body);
        res.status(result.status).json(result.data);
      } catch (error) {
        console.error('Error al manejar la solicitud:', error);
        res.status(500).json({ message: 'Error en el servidor' });
      }
    };

module.exports = findOrCreateUserHandler;
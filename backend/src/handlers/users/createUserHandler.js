const createUser = require ("../../controllers/users/createUser");

const createUserHandler = async (req, res) => {
    try {
      // Llama al controlador para crear el nuevo usuario
      await createUser(req, res);
    } catch (error) {
      // Si ocurre algún error durante el proceso, maneja el error adecuadamente
      console.error('Error en el manejador al crear un usuario:', error);
      return res.status(500).json({ message: 'Error al crear un usuario' });
    }
  };

module.exports = createUserHandler
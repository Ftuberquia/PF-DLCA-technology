const checkUserExists = require("../../controllers/Users/getUser");

const getUserHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const existingUser = await checkUserExists(id);

    if (existingUser) {
      return res.status(200).json(existingUser);
    }

    return res.status(404).json({ message: "El usuario no existe en la base de datos" });
  } catch (error) {
    console.error("Error al verificar el usuario en la base de datos:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = getUserHandler;
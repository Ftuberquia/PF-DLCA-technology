const { Users } = require("../../db");

// Controlador para verificar si un usuario ya existe en la base de datos
const checkUserExists = async (email) => {
  try {
    const existingUser = await Users.findOne({
      where: {
        email: email,
      },
    });

    return existingUser;
  } catch (error) {
    throw error;
  }
};

module.exports = checkUserExists;


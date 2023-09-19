const { Users } = require("../../db");

// Controlador para verificar si un usuario ya existe en la base de datos
const checkUserExists = async (email) => {
    const existingUser = await Users.findOne({
      where: {
        email: email,
      },
    });

    return existingUser;
};

module.exports = checkUserExists;


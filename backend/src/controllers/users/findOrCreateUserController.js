const { Users, Cart } = require("../../db")

const findOrCreateUserController = async (userData) => {

    try {
        const { id, first_name, last_name, username, email } = userData;
    
        // Utiliza findOrCreate para buscar o crear un usuario
        const [user, created] = await Users.findOrCreate({
          where: { id }, // Busca por el campo 'id'
          defaults: {
            first_name,
            last_name, 
            username,
            email,
            // Otros campos de datos que quieras asignar por defecto
          },
        });
    
        if (created) {
          const newCart = await Cart.create({
            userId: user.id, // Asigna el userId del nuevo usuario al carrito
          });

          return { status: 201, data: { message: 'Usuario creado con éxito', user } };
        } else {
          // El usuario ya existía
          return { status: 200, data: { message: 'Usuario encontrado', user } };
        }
      } catch (error) {
        console.error('Error al crear o buscar un usuario:', error);
        throw error;
      }
};

module.exports = findOrCreateUserController;
const { Users, Cart } = require('../../db');

const createUser = async (req, res) => {
  try {
    // Obtiene los datos del nuevo usuario desde el cuerpo de la solicitud (req.body)
    const { id, first_name, last_name, username, email, address, phone } =
      req.body;

      // Verifica si el usuario ya existe en la base de datos
      const user = await Users.findByPk(id);
      if (user) {
        return res.status(201).json({ message: 'El usuario ya existe en la base de datos', user });
      }else{
        // Crea el nuevo usuario en la base de datos
        const newUser = await Users.create({
          id,
          first_name,
          last_name,
          username,
          email,
          address,
          phone,
          // Puedes establecer otros valores por defecto aquí, como avatar_img, admin, master, isActive, etc.
        });
    
      // Crea un carrito para el nuevo usuario
        const newCart = await Cart.create({
        userId: newUser.id, // Asigna el userId del nuevo usuario al carrito
      });

        // Envía una respuesta de éxito
        return res.status(200).json({ message: 'Usuario creado con éxito', user: newUser });
      }
    } catch (error) {
      // Si ocurre algún error durante el proceso, maneja el error adecuadamente
      console.error('Error al crear un usuario:', error);
      return res.status(500).json({ message: 'Error al crear un usuario' });

    }
};

module.exports = createUser;
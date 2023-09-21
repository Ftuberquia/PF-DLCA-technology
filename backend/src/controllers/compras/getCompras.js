// const { Users, Orders, UserOrder, Products } = require('../../db');

const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    // Verifica si el usuario existe
    const user = await Users.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Obtiene las compras del usuario
    const userOrders = await Orders.findAll({
      where: { userId },
      include: [
        {
          model: Products, // Agregado: importa el modelo Products
          as: 'products',
          attributes: ['name', 'price', 'quantity'], // Ajusta los atributos que deseas mostrar
          through: {
            model: UserOrder, // Asocia la tabla intermedia UserOrder
            as: 'orderProduct', // Nombre del alias en la relación
            attributes: ['quantity'], // Ajusta los atributos de la relación
          },
        },
      ],
    });

    if (userOrders.length === 0) {
      return res.status(200).json({ message: 'El usuario no ha realizado compras' });
    }

    return res.status(200).json(userOrders);

  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Error al obtener las compras del usuario', error: error.message });
  }
};

module.exports = getUserOrders;

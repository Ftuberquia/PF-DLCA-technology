const { Cart, Products, User } = require("../../db");

const deleteProdCart = async (userId, Productosaeliminar) => {
try {
    // Verificar si el cliente existe
    const clienteExistente = await User.findByPk(userId);
    if (!clienteExistente) {
      throw new Error(`El cliente con ID ${userId} no existe.`);
    }
    // Buscar el carrito del cliente
    const carritoExistente = await Cart.findOne({
      where: {
        userId,
        pagado: false,
      },
    });
    if (!carritoExistente) {
      throw new Error(`No se encontró un carrito activo para el cliente con ID ${userId}.`);
    }

    let productosEnCarrito = carritoExistente.productos;
    let nuevoCarrito = []

    let { inventarioId, productoId } = Productosaeliminar;

      let inventarioExistente;
      // Verificar si el inventario existe
      if (inventarioId) {
        inventarioExistente = await Inventario.findByPk(inventarioId);
        if (!inventarioExistente) {
          throw new Error(`El inventario con ID ${inventarioId} no existe.`);
        }
        productoId = inventarioExistente.dataValues.productoId
        colorId = inventarioExistente.dataValues.colorId
      }else if (productoId && colorId) {
        inventarioExistente = await Inventario.findOne({
          where: {
            productoId,
            colorId,
          },
        });
        if (!inventarioExistente) {
          throw new Error(`El inventario con producto ${productoId} y color ${colorId} no existe.`);
        }
        inventarioId = inventarioExistente.dataValues.inventarioId
      }    

      for (let i = 0; i < productosEnCarrito.length; i++) {
        if (productosEnCarrito[i].inventarioId !== inventarioExistente.id) {
            nuevoCarrito.push(productosEnCarrito[i])
        }        
      }
      

    await Carrito.update({ productos: nuevoCarrito }, {
      where: {
        id: carritoExistente.id,
      },
    });

    let carritoenviar = await Carrito.findByPk(carritoExistente.id)

    carritoenviar.dataValues.id = `carr-${carritoenviar.dataValues.id}`;

    return carritoenviar;
  } catch (error) {
    console.error('Error al eliminar productos al carrito:', error.message);
    throw error;
   
  }
};
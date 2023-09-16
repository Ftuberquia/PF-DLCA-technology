const express = require('express');
const router = express.Router();
const Compra = require('../../models/compra'); // Asegúrate de importar el modelo

// Ruta para guardar la compra en la base de datos
router.post('/guardar-compra', async (req, res) => {
  try {
    const { userId, productId, quantity, total_price } = req.body;

    // Crea un nuevo registro de compra en la base de datos
    const nuevaCompra = await Compra.create({
      userId,
      productId,
      quantity,
      total_price,
      order_date: new Date(), // Puedes obtener la fecha actual
      estate: 'Pendiente', // Puedes ajustar el estado según tu lógica
      created: false, // Puedes ajustar este valor según tu lógica
    });

    return res.status(201).json({ message: 'Compra guardada con éxito', compra: nuevaCompra });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al guardar la compra' });
  }
});

module.exports = router;



// const createOrder = async (req, res) => {
//   try {
//     const { userId, productId, quantity, total_price, id, amount, return_url, } = req.body;

    
//     // Verifica si el usuario y el producto existen
//     const user = await Users.findByPk(userId);
//     const product = await Products.findByPk(productId);

//     if (!user) {
//       return res.status(404).json({ message: 'Usuario no encontrado' });
//     }
//     if (!product) {
//       return res.status(404).json({ message: 'Producto no encontrado' });
//     }

//     // Crea una nueva compra en la tabla "orders"
//     const newOrder = await Orders.create({
//       userId: user.id,
//       order_date: new Date(),
//       state: 'Pendiente',
//       quantity,
//       total_price,
//       created: true,
//     });

//     // Asocia el producto a la compra utilizando UserOrder
//     await UserOrder.create({
//       userId: user.id,
//       orderId: newOrder.id, // Utiliza el ID de la compra recién creada
//       productId: product.id, // Utiliza el ID del producto
//       quantity,
//     })}
//     catch{

//     }
// }
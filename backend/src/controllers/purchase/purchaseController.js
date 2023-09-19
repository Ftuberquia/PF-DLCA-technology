const { Order, PurchasedProduct } = require('../../db');

const createPurchase = async (userId, productIds, quantities, totalPrice) => {
  const order = await Order.create({
    userId,
    orderDate: new Date(),  // Proporciona una fecha de pedido, puedes ajustarla según sea necesario
    state: 'Pending',  // Proporciona un estado inicial, como "Pendiente"
    totalQuantity: productIds.length,  // La cantidad total es la cantidad de productos en el pedido
    totalPrice,  
    productIds
  });
  const purchasedProducts = [];

  for (let i = 0; i < productIds.length; i++) {
    const productId = productIds[i];
    const quantity = quantities[i];
    const purchasedProduct = await PurchasedProduct.create({
      orderId: order.orderNumber,
      productId,
      quantity,
      totalPrice: quantity * totalPrice, // Adjust the calculation as per your business logic
      userId
    });
    purchasedProducts.push(purchasedProduct);
  }

  return { order, purchasedProducts };
};

module.exports = {
  createPurchase,
};

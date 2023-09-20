const { Order, PurchasedProduct } = require('../../db');

const createPurchase = async (userId, productIds, quantities, totalPrice,totalQuantityProducts,priceProductTotal) => {
  const order = await Order.create({
    userId,
    orderDate: new Date(),  // Proporciona una fecha de pedido, puedes ajustarla según sea necesario
    state: 'Pending',  // Proporciona un estado inicial, como "Pendiente"
    totalQuantity: totalQuantityProducts,  // La cantidad total es la cantidad de productos en el pedido
    totalPrice,  
    productIds
  });
  const purchasedProducts = [];

  for (let i = 0; i < productIds.length; i++) {
    const productId = productIds[i];
    const quantity = quantities[i];
    const priceTotal = priceProductTotal[i];
    const purchasedProduct = await PurchasedProduct.create({
      orderId: order.orderNumber,
      productId,
      quantity,
      //totalPrice: quantity * totalPrice, // Adjust the calculation as per your business logic //Esta muy mal la logica, esto esta multiplicando el precio total de la compra por las diferentes cantidades de productos
      totalPrice:priceTotal,
      userId
    });
    purchasedProducts.push(purchasedProduct);
  }

  return { order, purchasedProducts };
};

module.exports = {
  createPurchase,
};

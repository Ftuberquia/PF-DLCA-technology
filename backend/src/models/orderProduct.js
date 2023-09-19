const { DataTypes } = require('sequelize');

const OrderProduct = (sequelize) => {
    const OrderProductModel = sequelize.define('orderProduct', {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      unitPrice: {
        type: DataTypes.FLOAT,  // Precio unitario del producto en esta orden
        allowNull: false,
      },
      // Otros campos relacionados con la compra que desees agregar
    }, {
      modelName: 'OrderProduct',
      timestamps: false,
      freezeTableName: true,
    });
  
    return OrderProductModel;
  };
  
  module.exports = OrderProduct;
const { DataTypes } = require('sequelize');

const Order = (sequelize) => {
  const OrderModel = sequelize.define('order', {
    orderNumber: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    orderDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    created: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    productIds: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),  // Array para almacenar IDs de productos
      allowNull: false,
    },
  }, {
    modelName: 'Order',
    timestamps: false,
    freezeTableName: true,
  });

  return OrderModel;
};

module.exports = Order;

const { DataTypes } = require('sequelize');

const UserOrder = (sequelize) => {
  sequelize.define('UserOrder', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'user_orders', 
    timestamps: true, // Activa las marcas de tiempo para la creación y actualización
    freezeTableName: true,
    indexes: [
      {
        unique: true, 
        fields: ['userId', 'orderId'],
      },
    ],
  });
};

module.exports = UserOrder;

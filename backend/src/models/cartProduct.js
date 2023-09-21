const { DataTypes } = require("sequelize");

const CartProduct = (sequelize) => {
  sequelize.define(
    "cartProduct",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      cartId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity_prod: {
        type: DataTypes.INTEGER,
        allowNull: false, // Permitir valores nulos
        defaultValue: 1, // Valor por defecto
      },
      total_price_product:{
        type: DataTypes.FLOAT,
        allowNull: false
      }
    },
    {
      tableName: "cartProduct",
      timestamps: false,
      freezeTableName: true,
    }
  );
};

module.exports = CartProduct;
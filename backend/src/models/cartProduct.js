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
      id_cart: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_product: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity_prod: {
        type: DataTypes.INTEGER,
        allowNull: false, // Permitir valores nulos
        defaultValue: 1, // Valor por defecto
      },
    },
    {
      tableName: "cartProduct",
      timestamps: false,
      freezeTableName: true,
    }
  );
};

module.exports = CartProduct;
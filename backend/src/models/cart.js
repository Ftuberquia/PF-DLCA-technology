const { DataTypes } = require("sequelize");

const Cart = (sequelize) => {
  sequelize.define(
    "cart",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      pagado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      total_precio: {
        type: DataTypes.FLOAT,
        allowNull: false, // Permitir valores nulos
        defaultValue: 0, // Valor por defecto
      },
    },
    {
      tableName: "cart",
      timestamps: false,
      freezeTableName: true,
    }
  );
};

module.exports = Cart;

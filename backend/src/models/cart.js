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
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      pagado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      fechaCompra: {
        type: DataTypes.STRING,
        allowNull: true, // Permitir valores nulos
        defaultValue: null, // Valor por defecto
      },
    },
    {
      tableName: "cart",
      timestamps: false,
      freezeTableName: true,
    }
  );

  // Definir las relaciones con otros modelos
  Cart.associate = (models) => {
    Cart.belongsTo(models.Users, {
      foreignKey: "usersId",
    });
  };
};

module.exports = Cart;

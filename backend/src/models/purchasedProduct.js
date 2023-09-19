const { DataTypes } = require('sequelize');

const PurchasedProduct = (sequelize) => {
  const PurchasedProductModel = sequelize.define('purchasedProduct', {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  }, {
    modelName: 'PurchasedProduct',
    timestamps: false,
    freezeTableName: true,
  });

  return PurchasedProductModel;
};

module.exports = PurchasedProduct;
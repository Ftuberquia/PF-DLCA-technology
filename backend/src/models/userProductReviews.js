const { DataTypes } = require('sequelize');

const UserProductReviews = (sequelize) => {
  sequelize.define('userProductReviews', {
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
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
    },
    comment: {
      type: DataTypes.STRING,
    },
    userEmail: {
      type: DataTypes.STRING,  
      allowNull: false  
    }
  }, {
    tableName: 'user_product_reviews',
    timestamps: true, // Activa las marcas de tiempo para la creación y actualización
    freezeTableName: true,
    indexes: [
      {
        unique: true, // Esto crea una restricción de clave única
        fields: ['userId', 'productId'],
      },
    ],
  });

};

module.exports = UserProductReviews;

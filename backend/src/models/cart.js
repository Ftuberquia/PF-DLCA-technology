const { DataTypes } = require('sequelize');

const Cart = (sequelize) => {
    sequelize.define("cart", {

        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, { 
        tableName: 'cart',
        timestamps: false,
        freezeTableName: true, });
};   

module.exports = Cart;
const { DataTypes } = require('sequelize');

const Favorites = (sequelize) => {
    sequelize.define("favorites", {
        
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        product: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }   
    }, {
        tableName: 'favorites',
        timestamps: false,
        freezeTableName: true,
    });
};

module.exports = Favorites;
  
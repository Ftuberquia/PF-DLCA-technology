const { DataTypes } = require('sequelize');

const Brand = (sequelize) => {
    sequelize.define("brand", {
        
        id : {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },

        name : {
            type: DataTypes.STRING,
            allowNull : false,
        },

        logo:{
            type: DataTypes.STRING,
            allowNull : false
        }

    }, { 
        tableName: 'brand',
        timestamps: false,
        freezeTableName: true, });
};   

module.exports = Brand;
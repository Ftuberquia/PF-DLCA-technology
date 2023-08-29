const { DataTypes } = require('sequelize');

const Subcategory = (sequelize) => {
    sequelize.define("subcategory", {
        
        id : {
            type : DataTypes.INTEGER,
            autoIncrement : true,
            primaryKey : true,
            allowNull : false,
        },
        name : {
            type: DataTypes.STRING,
            allowNull : false,
        }

    }, {
        tableName: 'subcategory',
        timestamps: false,
        freezeTableName: true,
    });
};

module.exports = Subcategory;
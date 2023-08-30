const { DataTypes } = require('sequelize');

const Category = (sequelize) => {
    sequelize.define("category", {
        
        id : {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },

        name : {
            type: DataTypes.STRING,
            allowNull : false,
        }

    }, {
        tableName: 'category',
        timestamps: false,
        freezeTableName: true,
    });
};

module.exports = Category;
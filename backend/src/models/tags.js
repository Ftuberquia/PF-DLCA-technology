const { DataTypes } = require('sequelize');

const Tags = (sequelize) => {
    sequelize.define("tags", {
        
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
        tableName: 'tags',
        timestamps: false,
        freezeTableName: true,
    });
};

module.exports = Tags;
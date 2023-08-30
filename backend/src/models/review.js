const { DataTypes } = require('sequelize')

const Review = (sequelize) => {
	sequelize.define('review', {

        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        comment: {
            type: DataTypes.STRING,
        },
        rating: {
            type: DataTypes.FLOAT,
        }
    }, {
        tableName: 'review',
        timestamps: false,
        freezeTableName: true,
    });
};

module.exports = Review;
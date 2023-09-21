const { DataTypes } = require('sequelize');

const Compra = (sequelize) => {
    sequelize.define("compra", {
        order_numer: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        order_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        estate: {
            type: DataTypes.STRING,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        total_price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        created: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        tableName: 'compra', // Cambia el nombre de la tabla si es necesario
        timestamps: false, // Si deseas habilitar timestamps, cambia esto a true
        freezeTableName: true, // Para evitar que Sequelize pluralice el nombre de la tabla
    });
};

module.exports = Compra;

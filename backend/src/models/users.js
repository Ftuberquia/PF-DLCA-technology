const { DataTypes, Sequelize } = require("sequelize");

const Users = (sequelize) => {
  sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },

      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "nombre"
      },

      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "apellido"
      },

      username: {
        type: DataTypes.TEXT,
        unique: true,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      avatar_img: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "https://i.ibb.co/9byM8Fk/avatar-user.png",
      },

      admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      master: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true, // Puedes establecer el valor predeterminado como "true" (activo)
      },

      createdAt:{
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
        allowNull: false
      }
    },
    {
      tableName: "users",
      timestamps: false,
      freezeTableName: true,
    }
  );
};

module.exports = Users;

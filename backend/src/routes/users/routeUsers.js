const {Router} = require ("express");

const updateUserHandler = require("../../handlers/users/updateUserHandler");
const findOrCreateUserHandler = require("../../handlers/users/findOrCreateUser");

const users = Router();

users.post("/", findOrCreateUserHandler)
users.put("/:id", updateUserHandler)

module.exports = users;

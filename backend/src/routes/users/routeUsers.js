const {Router} = require ("express");

const updateUserHandler = require("../../handlers/users/updateUserHandler");
const findOrCreateUserHandler = require("../../handlers/users/findOrCreateUser");
const getAllUserHandler = require("../../handlers/users/getAllUsersHandler")

const users = Router();

users.get("/", getAllUserHandler)
users.post("/", findOrCreateUserHandler)
users.put("/:id", updateUserHandler)


module.exports = users;

const {Router} = require ("express");

const updateUserHandler = require("../../handlers/users/updateUserHandler");
const findOrCreateUserHandler = require("../../handlers/users/findOrCreateUser");
const getAllUserHandler = require("../../handlers/users/getAllUsersHandler");
const checkUserHandler = require("../../handlers/users/getUserHandler");

const users = Router();

users.get("/", getAllUserHandler)
users.post("/", findOrCreateUserHandler)
users.put("/:id", updateUserHandler)
users.get("/:email", checkUserHandler)

module.exports = users;

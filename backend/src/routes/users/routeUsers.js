const {Router} = require ("express");
const postUsers = require ("../../handlers/users/createUserHandler"); 
const getUsers = require("../../handlers/users/getUserHandler");
const updateUserHandler = require("../../handlers/users/updateUserHandler");

const users = Router();

users.get("/:id", getUsers)
users.post("/", postUsers);
users.put("/:id", updateUserHandler)

module.exports = users;

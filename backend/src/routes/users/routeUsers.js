const {Router} = require ("express");
const postUsers = require ("../../handlers/users/createUserHandler"); 
const getUsers = require("../../handlers/users/getUserHandler");

const users = Router();

users.get("/", getUsers)
users.post("/", postUsers);


module.exports = users;

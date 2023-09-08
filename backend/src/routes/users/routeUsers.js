const {Router} = require ("express");
const postUsers = require ("../../handlers/users/createUserHandler"); 


const users = Router();

users.post("/", postUsers)

module.exports = users;

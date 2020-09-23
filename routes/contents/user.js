"use strict";

const users = require("express").Router();
const UserController = require("../../controllers/userController");

users.get("/mylist", UserController.myList);

users.get("/add/:id", UserController.addToMyListGet);
users.post("/add/:id", UserController.addToMyListPost)

module.exports = users;

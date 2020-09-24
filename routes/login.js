"use strict";

const login = require("express").Router();
const loginController = require("../controllers/loginController");

login.get("/", loginController.loginGet);
login.post("/", loginController.loginPost);

login.get("/out", loginController.logout);

module.exports = login;

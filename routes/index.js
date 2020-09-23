"use strict";

const index = require("express").Router();
const indexController = require("../controllers/indexController");
const login = require("./login");
const registration = require("./registration");
const indexContent = require("./contents/index");

index.use("/login", login);
index.use("/registration", registration);
index.use("/main", indexContent);

index.get("/", indexController.displayHome);

module.exports = index;

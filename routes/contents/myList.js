"use strict";

const myList = require("express").Router();
const UserController = require("../../controllers/userController");

myList.get("/all", UserController.myList);

myList.get("/add/:id", UserController.addToMyListGet);
myList.post("/add/:id", UserController.addToMyListPost);

myList.get("/delete", UserController.deleteOneFromMyList);

myList.get("/addchapter", UserController.addChapter);
myList.get("/addvolume", UserController.addVolume);

myList.get("/toread", UserController.toRead)

module.exports = myList;

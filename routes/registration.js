"use strict";

const registration = require("express").Router();
const multer = require("multer");
const path = require("path");
const userController = require("../controllers/userController");

const storage = multer.diskStorage({
	destination: "./public/profilePic/",
	filename: (req, file, cb) => {
		cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
	},
});

const upload = multer({ storage: storage });

registration.get("/", userController.addUserGet);
registration.post("/", upload.single("profilePic"), userController.addUserPost);

module.exports = registration;

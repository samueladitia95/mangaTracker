"use strict";

const { User } = require("../models");
const bcrypt = require("bcrypt");

class userController {
	static addUserGet(req, res) {
		res.render("registration");
	}

	static addUserPost(req, res, next) {
		var salt = bcrypt.genSaltSync(10);
		const password = bcrypt.hashSync(req.body.password, salt);
		const parameter = {
			userName: req.body.userName,
			password: password,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			profilePic: req.file.path,
			isAdmin: false,
		};
		
		User.create(parameter)
			.then(() => {
				res.redirect("/login");
			})
			.catch((err) => {
				res.send(err);
			});
	}
}

module.exports = userController;

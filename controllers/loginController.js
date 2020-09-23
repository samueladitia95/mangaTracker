"use strict";

const bcrypt = require("bcrypt");
const { User } = require("../models");

class loginController {
	static loginGet(req, res) {
		res.render("logIn");
	}

	static loginPost(req, res) {
		User.findAll({
			where: { userName: req.body.userName },
		})
			.then((data) => {
				if (bcrypt.compareSync(req.body.password, data[0].password)) {
					req.session.isLogin = true;
					req.session.userName = data[0].userName;
					req.session.userId = data[0].id;
				}
				res.redirect("/main/mangas");
			})
			.catch((err) => {
				res.send(err);
			});
	}
}

module.exports = loginController;

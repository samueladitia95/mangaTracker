"use strict";

const bcrypt = require("bcrypt");
const { User } = require("../models");

class loginController {
	static loginGet(req, res) {
		res.render("logIn", { err: req.query.err });
	}

	static loginPost(req, res) {
		User.findAll({
			where: { userName: req.body.userName },
		})
			.then((data) => {
				if (!data.length) {
					res.redirect("/login?err=Username doesn't exist");
				} else if (bcrypt.compareSync(req.body.password, data[0].password)) {
					req.session.isLogin = true;
					req.session.userName = data[0].userName;
					req.session.userId = data[0].id;
					req.session.profilePicPath = data[0].profilePic;
					req.session.isAdmin = data[0].isAdmin;
					req.session.fullName = data[0].fullName();
					res.redirect("/main/mangas");
				} else {
					res.redirect("/login?err=Wrong password");
				}
			})
			.catch((err) => {
				res.send(err);
			});
	}

	static logout(req, res) {
		req.session.isLogin = false;
		res.redirect("/")
	}
}

module.exports = loginController;

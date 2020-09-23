"use strict";

const { User, MangaUser, Manga } = require("../models");
const bcrypt = require("bcrypt");

class userController {
	static addUserGet(req, res) {
		res.render("registration");
	}

	static addUserPost(req, res, next) {
		let salt = bcrypt.genSaltSync(10);
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

	static myList(req, res) {
		console.log(req.session.userId);
		User.findAll({
			where: { id: req.session.userId },
			include: Manga,
		})
			.then((data) => {
				res.render("myList", {
					user: data,
					mangas: data[0].Mangas,
				});
			})
			.catch((err) => {
				res.send(err);
			});
	}

	static addToMyListGet(req, res) {
		Manga.findByPk(req.params.id)
			.then((data) => {
				res.render("addToMyList", { manga: data });
			})
			.catch((err) => {
				res.render(err);
			});
	}

	static addToMyListPost(req, res) {
		MangaUser.create({
			MangaId: req.params.id,
			UserId: req.session.userId,
			status: req.body.status,
			chapter: req.body.chapter,
			volume: req.body.volume,
		})
			.then(() => {
				res.redirect("/main/users/mylist");
			})
			.catch((err) => {
				res.send(err);
			});
	}
}

module.exports = userController;

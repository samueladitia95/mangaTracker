"use strict";

const { User, MangaUser, Manga } = require("../models");
// const bcrypt = require("bcrypt");

class userController {
	static addUserGet(req, res) {
		let errors = [];
		if (req.query.err) {
			errors = req.query.err.split(",");
		}
		res.render("registration", { errors });
	}

	static addUserPost(req, res, next) {
		const parameter = {
			userName: req.body.userName,
			password: req.body.password,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			profilePic: req.file ? req.file.path.slice(6) : "",
			isAdmin: req.body.isAdmin === "true" ? true : false,
		};

		User.create(parameter)
			.then(() => {
				res.redirect("/login");
			})
			.catch((err) => {
				const errMessage = [];
				err.errors.forEach((el) => {
					errMessage.push(el.message);
				});
				res.redirect(`/registration?err=${errMessage.join(",")}`);
			});
	}

	static myList(req, res) {
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
		let mangaData = null;
		Manga.findByPk(req.params.id)
			.then((data) => {
				mangaData = data;
				return MangaUser.findAll({
					where: {
						UserId: req.session.userId,
						MangaId: data.id,
					},
				});
			})
			.then((data) => {
				if (data.length) {
					res.redirect("/main/mangas?err=Manga already added");
				} else {
					res.render("addToMyList", { manga: mangaData });
				}
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
			chapter: req.body.chapter || 0,
			volume: req.body.volume || 0,
		})
			.then(() => {
				res.redirect("/main/mylist/all");
			})
			.catch((err) => {
				res.send(err);
			});
	}

	static deleteOneFromMyList(req, res) {
		MangaUser.destroy({
			where: { MangaId: req.query.MangaId, UserId: req.query.UserId },
		})
			.then(() => {
				res.redirect("/main/mylist/all");
			})
			.catch((err) => {
				res.send(err);
			});
	}

	static addChapter(req, res) {
		let newChapter = Number(req.query.chapter);
		MangaUser.update(
			{
				chapter: ++newChapter,
			},
			{ where: { MangaId: req.query.MangaId, UserId: req.query.UserId } },
		)
			.then(() => {
				res.redirect("/main/mylist/all");
			})
			.catch((err) => {
				res.send(err);
			});
	}

	static addVolume(req, res) {
		let newVolume = Number(req.query.volume);
		MangaUser.update(
			{
				volume: ++newVolume,
			},
			{ where: { MangaId: req.query.MangaId, UserId: req.query.UserId } },
		)
			.then(() => {
				res.redirect("/main/mylist/all");
			})
			.catch((err) => {
				res.send(err);
			});
	}

	static toRead(req, res) {
		MangaUser.update(
			{
				status: "Reading",
			},
			{ where: { MangaId: req.query.MangaId, UserId: req.query.UserId } },
		)
			.then(() => {
				res.redirect("/main/mylist/all");
			})
			.catch((err) => {
				res.send(err);
			});
	}
}

module.exports = userController;

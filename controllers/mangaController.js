"use strict";

const { Manga, MangaComment, User } = require("../models");
const checked = require("../helpers/checkedConditional");

class mangaController {
	static displayAll(req, res) {
		let errors = [];
		if (req.query.err) {
			errors = req.query.err.split(",");
		}
		Manga.findAll()
			.then((data) => {
				res.render("displayAll", { mangas: data, session: req.session, errors });
			})
			.catch((err) => {
				res.send(err);
			});
	}

	static addMangaGet(req, res) {
		let errors = [];
		if (req.query.err) {
			errors = req.query.err.split(",");
		}
		res.render("addManga", { errors });
	}

	static addMangaPost(req, res) {
		Manga.create(req.body)
			.then(() => {
				res.redirect("/main/mangas");
			})
			.catch((err) => {
				const errMessage = [];
				err.errors.forEach((el) => {
					errMessage.push(el.message);
				});
				res.redirect(`/main/mangas/add?err=${errMessage.join(",")}`);
			});
	}

	static editMangaGet(req, res) {
		let errors = [];
		if (req.query.err) {
			errors = req.query.err.split(",");
		}
		Manga.findByPk(req.params.id)
			.then((data) => {
				res.render("editManga", { manga: data, checked, errors });
			})
			.catch((err) => {
				res.send(err);
			});
	}

	static editMangaPost(req, res) {
		Manga.update(req.body, {
			where: { id: req.params.id },
		})
			.then(() => {
				res.redirect("/main/mangas");
			})
			.catch((err) => {
				const errMessage = [];
				err.errors.forEach((el) => {
					errMessage.push(el.message);
				});
				res.redirect(`/main/mangas/edit/${req.params.id}?err=${errMessage.join(",")}`);
			});
	}

	static deleteManga(req, res) {
		Manga.destroy({
			where: { id: req.params.id },
		})
			.then(() => {
				res.redirect("/main/mangas");
			})
			.catch((err) => {
				res.send(err);
			});
	}

	//! Maybe can use Promise.all
	static displayComments(req, res) {
		let commentData = null;
		Manga.findAll({
			where: { id: req.params.id },
			include: MangaComment,
		})
			.then((data) => {
				commentData = data;
				return MangaComment.findAll({
					where: { MangaId: data[0].id },
					include: User,
				});
			})
			.then((data) => {
				res.render("mangaPage", {
					manga: commentData[0],
					comments: commentData[0].MangaComments || [],
					userId: req.session.userId,
					data: data,
				});
			})
			.catch((err) => {
				res.send(err);
			});
	}

	static addComment(req, res) {
		MangaComment.create({
			UserId: req.query.UserId,
			MangaId: req.query.MangaId,
			comment: req.body.comment,
		})
			.then((data) => {
				res.redirect(`/main/mangas/comment/${data.MangaId}`);
			})
			.catch((err) => {
				res.send(err);
			});
	}

	static findHotMangas(req, res) {
		Manga.findHot((data) => {
			res.render("displayAll", { mangas: data, session: req.session, errors: [] });
		});
	}
}

module.exports = mangaController;

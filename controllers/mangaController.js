"use strict";

const { Manga, MangaComment, User } = require("../models");
const manga = require("../models/manga");
const user = require("../models/user");

class mangaController {
	static displayAll(req, res) {
		Manga.findAll()
			.then((data) => {
				res.render("displayAll", { mangas: data, session: req.session });
			})
			.catch((err) => {
				res.send(err);
			});
	}

	static addMangaGet(req, res) {
		res.render("addManga");
	}

	static addMangaPost(req, res) {
		Manga.create(req.body)
			.then(() => {
				res.redirect("/main/mangas");
			})
			.catch((err) => {
				res.send(err);
			});
	}

	static editMangaGet(req, res) {
		Manga.findByPk(req.params.id)
			.then((data) => {
				res.render("editManga", { manga: data });
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
				res.send(err);
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
					data: data
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
}

module.exports = mangaController;

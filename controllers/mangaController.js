"use strict";

const { Manga } = require("../models");

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
}

module.exports = mangaController;

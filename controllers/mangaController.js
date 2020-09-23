"use strict";

const { Manga } = require("../models");

class mangaController {
	static displayAll(req, res) {
		Manga.findAll()
			.then((data) => {
				res.render("displayAll", { mangas: data });
			})
			.catch((err) => {
				res.send(err);
			});
	}
}

module.exports = mangaController;

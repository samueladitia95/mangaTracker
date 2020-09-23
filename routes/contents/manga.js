"use strict";

const mangas = require("express").Router();
const MangaController = require("../../controllers/mangaController");

const isAdminCheck = (req, res, next) => {
	if (!req.session.isAdmin) {
		res.redirect("/");
	}
	next();
};

mangas.get("/",isAdminCheck, MangaController.displayAll);

module.exports = mangas;

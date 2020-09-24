"use strict";

const mangas = require("express").Router();
const MangaController = require("../../controllers/mangaController");

const isAdminCheck = (req, res, next) => {
	if (!req.session.isAdmin) {
		res.redirect("/");
	}
	next();
};

mangas.get("/", MangaController.displayAll);

mangas.get("/add", isAdminCheck, MangaController.addMangaGet);
mangas.post("/add", isAdminCheck, MangaController.addMangaPost);

mangas.get("/delete/:id", isAdminCheck, MangaController.deleteManga);

mangas.get("/edit/:id", isAdminCheck, MangaController.editMangaGet);
mangas.post("/edit/:id", isAdminCheck, MangaController.editMangaPost);



module.exports = mangas;

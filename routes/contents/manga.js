"use strict";

const mangas = require("express").Router();
const MangaController = require("../../controllers/mangaController");

mangas.get("/", MangaController.displayAll);

module.exports = mangas;

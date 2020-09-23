"use strict";

const indexContent = require("express").Router();
const mangas = require("./manga");
const myList = require("./myList");

indexContent.use((req, res, next) => {
	if (!req.session.isLogin) {
		res.redirect("/login");
	}
	next();
});

indexContent.use("/mangas", mangas);
indexContent.use("/mylist", myList);

module.exports = indexContent;

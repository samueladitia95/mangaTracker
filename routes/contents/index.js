"use strict";

const indexContent = require("express").Router();
const mangas = require("./manga");
const users = require("./user");

indexContent.use((req, res, next) => {
	if (!req.session.isLogin) {
		res.redirect("/login");
	}
	next();
});

indexContent.use("/mangas", mangas);
indexContent.use("/users", users);

module.exports = indexContent;

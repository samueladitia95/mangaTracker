"use strict";

const indexContent = require("express").Router();

indexContent.use((req, res, next) => {
	if (!req.session.isLogin) {
		res.redirect("/login");
	}
	next();
});

indexContent("/");

module.exports = indexContent;

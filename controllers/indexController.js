"use strict";

class indexController {
	static displayHome(req, res) {
		res.render("homePage");
	}
}

module.exports = indexController;

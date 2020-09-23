"use strict";

class indexController {
	static displayHome(req, res) {
        // res.render("homePage");
        req.session.login = true
        res.send(req.session)
	}
}

module.exports = indexController;

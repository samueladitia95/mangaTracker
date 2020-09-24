"use strict";

const fs = require("fs");

module.exports = {
	up: (queryInterface, Sequelize) => {
		let data = JSON.parse(fs.readFileSync("./seeders/data/mangas.json"));
		data.forEach((el) => {
			el.createdAt = new Date();
			el.updatedAt = new Date();
		});
		return queryInterface.bulkInsert("Mangas", data, {});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Mangas", data, {});
	},
};

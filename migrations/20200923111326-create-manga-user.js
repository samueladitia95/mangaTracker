"use strict";
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("MangaUsers", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			MangaId: {
				type: Sequelize.INTEGER,
			},
			UserId: {
				type: Sequelize.INTEGER,
			},
			status: {
				type: Sequelize.STRING,
			},
			chapter: {
				type: Sequelize.INTEGER,
			},
			volume: {
				type: Sequelize.INTEGER,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable("MangaUsers");
	},
};

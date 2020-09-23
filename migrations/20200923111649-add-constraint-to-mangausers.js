"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */
		return queryInterface
			.addConstraint("MangaUsers", {
				fields: ["MangaId"],
				type: "foreign key",
				name: "custom_fkey_constraint_mangaid",
				references: {
					table: "Mangas",
					field: "id",
				},
				onDelete: "no action",
				onUpdate: "no action",
			})
			.then(() => {
				return queryInterface.addConstraint("MangaUsers", {
					fields: ["UserId"],
					type: "foreign key",
					name: "custom_fkey_constraint_userid",
					references: {
						table: "Users",
						field: "id",
					},
					onDelete: "no action",
					onUpdate: "no action",
				});
			});
	},

	down: (queryInterface, Sequelize) => {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
		return Promise.all([
			queryInterface.removeConstraint("MangaUsers", "custom_fkey_constraint_mangaid", {}),
			queryInterface.removeConstraint("MangaUsers", "custom_fkey_constraint_userid", {}),
		]);
	},
};

"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */

		return queryInterface
			.addConstraint("MangaComments", {
				fields: ["MangaId"],
				type: "foreign key",
				name: "custom_fkey_constraint_mangaidcomment",
				references: {
					table: "Mangas",
					field: "id",
				},
				onDelete: "no action",
				onUpdate: "no action",
			})
			.then(() => {
				return queryInterface.addConstraint("MangaComments", {
					fields: ["UserId"],
					type: "foreign key",
					name: "custom_fkey_constraint_useridcomment",
					references: {
						table: "Users",
						field: "id",
					},
					onDelete: "no action",
					onUpdate: "no action",
				});
			});
	},

	down: async (queryInterface, Sequelize) => {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
		return Promise.all([
			queryInterface.removeConstraint("MangaComments", "custom_fkey_constraint_mangaid", {}),
			queryInterface.removeConstraint("MangaComments", "custom_fkey_constraint_userid", {}),
		]);
	},
};

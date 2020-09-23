"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Manga extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Manga.belongsToMany(models.User, { through: models.MangaUser });
		}
	}
	Manga.init(
		{
			name: DataTypes.STRING,
			author: DataTypes.STRING,
			artist: DataTypes.STRING,
			yearPublished: DataTypes.INTEGER,
			publicationStatus: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Manga",
		},
	);
	return Manga;
};

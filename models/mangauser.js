"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class MangaUser extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			MangaUser.belongsTo(models.Manga);
			MangaUser.belongsTo(models.User);
		}
	}
	MangaUser.init(
		{
			MangaId: DataTypes.INTEGER,
			UserId: DataTypes.INTEGER,
			status: DataTypes.STRING,
			chapter: DataTypes.INTEGER,
			volume: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "MangaUser",
		},
	);
	return MangaUser;
};

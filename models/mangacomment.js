"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class MangaComment extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			MangaComment.belongsTo(models.Manga, {
				targetKey: "id",
				foreignKey: "MangaId",
			});
			MangaComment.belongsTo(models.User, {
				targetKey: "id",
				foreignKey: "UserId",
			});
		}
	}
	MangaComment.init(
		{
			MangaId: DataTypes.INTEGER,
			UserId: DataTypes.INTEGER,
			comment: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "MangaComment",
		},
	);
	return MangaComment;
};

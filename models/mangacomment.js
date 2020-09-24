"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class MangaComment extends Model {
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

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
			status: {
				type: DataTypes.STRING,
				validate: {
					notEmpty: {
						msg: "Status must not be empty"
					},
				},
			},
			chapter: DataTypes.INTEGER,
			volume: DataTypes.INTEGER,
		},
		{
			hooks: {
				beforeCreate: (instance, options) => {
					if (!instance.chapter) {
						instance.chapter = 0;
					}
					if (!instance.volume) {
						instance.volume = 0;
					}
				},
			},
			sequelize,
			modelName: "MangaUser",
		},
	);
	return MangaUser;
};

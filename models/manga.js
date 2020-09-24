"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Manga extends Model {
		static associate(models) {
			Manga.belongsToMany(models.User, { through: models.MangaUser });
			Manga.hasMany(models.MangaComment, {
				sourceKey: "id",
				foreignKey: "MangaId",
			});
		}

		static findHot(cb) {
			const result = [];
			Manga.findAll()
				.then((data) => {
					data.forEach((el) => {
						if (
							el.yearPublished >= Number(new Date().getFullYear()) - 1 &&
							el.publicationStatus === "Ongoing"
						) {
							result.push(el);
						}
					});
					cb(result);
				})
				.catch(() => {
					cb(null);
				});
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

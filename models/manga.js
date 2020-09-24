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
			name: {
				type: DataTypes.STRING,
				validate: {
					notEmpty: {
						msg: "Title must not be empty",
					},
				},
			},
			author: {
				type: DataTypes.STRING,
				validate: {
					notEmpty: {
						msg: "Author must not be empty",
					},
				},
			},
			artist: DataTypes.STRING,
			yearPublished: DataTypes.INTEGER,
			publicationStatus: {
				type: DataTypes.STRING,
				validate: {
					notEmpty: {
						msg: "Publication Status must not be empty",
					},
				},
			},
		},
		{
			hooks: {
				beforeCreate: (instance, options) => {
					if (!instance.artist) {
						instance.artist = instance.author;
					}
				},
			},
			sequelize,
			modelName: "Manga",
		},
	);
	return Manga;
};

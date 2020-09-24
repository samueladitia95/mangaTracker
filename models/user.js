"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			User.belongsToMany(models.Manga, { through: models.MangaUser });
			User.hasMany(models.MangaComment, {
				sourceKey: "id",
				foreignKey: "UserId",
			});
		}
	}
	User.init(
		{
			userName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: "Username must not be empty",
					},
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: "Password must not be empty",
					},
					len: [8, 255],
				},
			},
			firstName: DataTypes.STRING,
			lastName: DataTypes.STRING,
			profilePic: DataTypes.STRING,
			isAdmin: {
				allowNull: false,
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
		},
		{
			hooks: {
				beforeCreate: (instance, options) => {
					console.log(instance);
					let salt = bcrypt.genSaltSync(10);
					instance.password = bcrypt.hashSync(instance.password, salt);
				},
			},
			sequelize,
			modelName: "User",
		},
	);
	return User;
};

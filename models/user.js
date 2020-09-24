"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		static associate(models) {
			User.belongsToMany(models.Manga, { through: models.MangaUser });
			User.hasMany(models.MangaComment, {
				sourceKey: "id",
				foreignKey: "UserId",
			});
		}

		fullName() {
			return `${this.firstName} ${this.lastName}`;
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
					notEmpty: {
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
					len: {
						args: [8, 255],
						msg: "Minimum password length must be 8 characters",
					},
				},
			},
			firstName: {
				type: DataTypes.STRING,
				validate: {
					notEmpty: {
						msg: "First Name must not be empty",
					},
				},
			},
			lastName: {
				type: DataTypes.STRING,
				validate: {
					notEmpty: {
						msg: "Last Name must not be empty",
					},
				},
			},
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
					let salt = bcrypt.genSaltSync(10);
					instance.password = bcrypt.hashSync(instance.password, salt);
				},
				beforeBulkCreate: (instances, options) => {
					instances.forEach((el) => {
						let salt = bcrypt.genSaltSync(10);
						el.password = bcrypt.hashSync(el.password, salt);
					});
				},
			},
			sequelize,
			modelName: "User",
		},
	);
	return User;
};

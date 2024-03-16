import { DataTypes } from 'sequelize'
import { database } from '../database/config.js'

export const User = database.define('User', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	username: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
		validate: { notEmpty: true, len: [5, 20] }
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
		validate: {
			notEmpty: true,
			isEmail: true
		}
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notEmpty: true,
			is: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).+$/
		}
	}
})

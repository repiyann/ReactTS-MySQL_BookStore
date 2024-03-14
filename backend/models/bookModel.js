import { DataTypes } from 'sequelize'
import { database } from '../database/config.js'

export const Book = database.define('Book', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false
	},
	author: {
		type: DataTypes.STRING,
		allowNull: false
	},
	publishYear: {
		type: DataTypes.INTEGER,
		allowNull: false
	}
})

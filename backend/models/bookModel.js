import { DataTypes } from 'sequelize'
import { sequelize } from '../database/config.js'

export const Book = sequelize.define('Book', {
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

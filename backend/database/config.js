import { Sequelize } from 'sequelize'

export const database = new Sequelize({
	host: 'localhost',
	dialect: 'mysql',
	username: 'root',
	password: '',
	database: 'bookstore'
})

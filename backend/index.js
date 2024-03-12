import express from 'express'
import cors from 'cors'
import bookRoutes from './routes/bookRoutes.js'
import { sequelize } from './database/config.js'

const PORT = 8080
const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (request, response) => {
	console.log(request)
	return response.status(234).send('Welcome to React + MySQL Stack Project')
})
app.use('/books', bookRoutes)

async function startServer() {
	try {
		await sequelize.sync()
		await sequelize.authenticate()
		console.log('Connection has been established successfully.')

		app.listen(PORT, () => {
			console.log(`Server is running on http://localhost:${PORT}`)
		})
	} catch (error) {
		console.log('Error:', error)
	}
}

startServer()

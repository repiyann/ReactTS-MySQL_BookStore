import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import csurf from 'csurf'
import bookRoutes from './routes/bookRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { database } from './database/config.js'

const PORT = 8080
const app = express()
const csrfProtection = csurf({ cookie: true })

app.use(express.json())
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(cookieParser())
app.use(csrfProtection)

app.use('/books', bookRoutes)
app.use('/auth', userRoutes)

app.get('/', (request, response) => {
	console.log(request)
	return response.status(200).send('Welcome to React + MySQL Stack Project')
})

app.get('/getCSRFToken', (request, response) => {
	response.json({ CSRFToken: request.csrfToken() })
})

app.use((error, request, response, next) => {
	if (error.code === 'EBADCSRFTOKEN') {
		response.status(403).send('CSRF Token Error')
	} else {
		next(error)
	}
})

app.use((error, request, response, next) => {
	console.error('Internal Server Error:', error)
	response.status(500).send('Internal Server Error')
})

async function startServer() {
	try {
		await database.sync()
		await database.authenticate()
		console.log('Connection has been established successfully.')

		app.listen(PORT, () => {
			console.log(`Server is running on http://localhost:${PORT}`)
		})
	} catch (error) {
		console.error('Error:', error)
	}
}

startServer()

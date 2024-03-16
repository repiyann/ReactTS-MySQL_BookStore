import express from 'express'
import bcrypt from 'bcrypt'
import rateLimit from 'express-rate-limit'
import { User } from '../models/userModel.js'

const loginLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 5,
	message: 'Too many login attempts, please try again later'
})

const router = express.Router()

router.post('/register', async (request, response) => {
	try {
		const { username, email, password, confirmPassword } = request.body

		if (!username || !email || !password || !confirmPassword) {
			return response.status(400).send({
				message: 'You need to send all required fields: Username, Email, Password, and Confirm Password'
			})
		}

		if (password !== confirmPassword) {
			return response.status(400).send({
				message: 'Password and Confirm Password do not match'
			})
		}

		const hashedPassword = await bcrypt.hash(password, 10)
		const newUser = {
			username,
			email,
			password: hashedPassword
		}

		const user = await User.create(newUser)

		response.status(201).send(user)
	} catch (error) {
		if (error.name === 'SequelizeValidationError') {
			response.status(400).send({ message: 'Validation error: ', errors: error.errors })
		} else {
			response.status(500).send({ message: `Error: ${error.message}` })
		}
	}
})

router.post('/login', loginLimiter, async (request, response) => {
	try {
		const { username, password } = request.body

		if (!username || !password) {
			return response.status(400).send({
				message: 'You need to send all required fields: Username and Password'
			})
		}

		const user = await User.findOne({ where: { username } })

		if (!user) {
			return response.status(400).send({ message: 'Invalid username or password' })
		}

		const match = await bcrypt.compare(password, user.password)

		if (!match) {
			return response.status(400).send({ message: 'Invalid username or password' })
		}

		response.status(200).send(user)
	} catch (error) {
		response.status(500).send({ message: `Error: ${error.message}` })
	}
})

export default router

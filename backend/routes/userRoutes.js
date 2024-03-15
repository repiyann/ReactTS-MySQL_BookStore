import express from 'express'
import bcrypt from 'bcrypt'
import rateLimit from 'express-rate-limit'
import { User } from '../models/userModel.js'

const loginLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 5,
	message: 'Too many login attempts, please try again later'
})
const router = express.Router()

router.post('/register', async (request, response) => {
	try {
		if (!request.body.username || !request.body.email || !request.body.password) {
			return response.status(400).send({
				message: 'Send all required fields: username, email, password'
			})
		}

		const hashedPassword = await bcrypt.hash(request.body.password, 10)
		const newUser = {
			username: request.body.username,
			email: request.body.email,
			password: hashedPassword
		}

		const user = await User.create(newUser)

		response.status(201).send(user)
	} catch (error) {
		if (error.name === 'SequelizeValidationError') {
			response.status(400).send({ message: 'Validation error', errors: error.errors })
		} else {
			response.status(500).send({ message: error.message })
		}
	}
})

router.post('/login', loginLimiter, async (request, response) => {
	try {
		if (!request.body.username || !request.body.password) {
			return response.status(400).send({
				message: 'Send all required fields: username, password'
			})
		}

		const user = await User.findOne({ where: { [Op.eq]: request.body.username } })
		const match = await bcrypt.compare(request.body.password, user.password)

		if (!user || !match) {
			return response.status(400).json({ error: 'Invalid username or password' })
		}

		response.status(200).send(user)
	} catch (error) {
		response.status(500).send({ message: error.message })
	}
})

export default router

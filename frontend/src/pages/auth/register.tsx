import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import Dropdown from '../../components/dropdown'
import { useTheme } from '../../components/useTheme'
import authImage from '/images/auth-image.svg'

function RegisterPage() {
	const { theme, setTheme } = useTheme()
	const [username, setUsername] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const navigate = useNavigate()
	const { enqueueSnackbar } = useSnackbar()

	function handleSelect(option: string) {
		option === 'light' || option === 'dark' || option === 'system' ? setTheme(option) : null
	}

	function handleRegister() {
		const data = {
			username,
			email,
			password
		}
		axios
			.post('http://localhost:8080/auth/register', data)
			.then(() => {
				enqueueSnackbar('Account created successfully', { variant: 'success' })
				navigate('/dashboard')
			})
			.catch((error) => {
				console.log(error)
				enqueueSnackbar(`Error: ${error.message}`, { variant: 'error' })
			})
	}

	return (
		<>
			<section className="flex flex-col md:flex-row h-screen items-center">
				<div className="bg-indigo-600 hidden lg:flex justify-center w-full md:w-1/2 xl:w-2/3 h-screen border-r-2 dark:border-black">
					<div className="flex items-center">
						<img
							src={authImage}
							className="w-3/4 h-3/4 object-cover mx-auto"
						/>
					</div>
				</div>

				<div className="bg-light dark:bg-gray-950 w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">
					<div className="w-full h-100">
						<h1 className="text-xl dark:text-white md:text-2xl font-bold leading-tight mt-12"> Create your account </h1>

						<form
							className="mt-6"
							method="POST"
							onSubmit={(e) => {
								e.preventDefault()
								handleRegister()
							}}
						>
							<div>
								<label className="block text-gray-700 dark:text-white"> Username </label>
								<input
									type="text"
									placeholder="Enter Username"
									className="w-full px-4 py-3 rounded-lg bg-[#e7def7] mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
									autoFocus
									required
									value={username}
									onChange={(e) => setUsername(e.target.value)}
								/>
							</div>
							<div className="mt-4">
								<label className="block text-gray-700 dark:text-white"> Email Address </label>
								<input
									type="email"
									placeholder="Enter Email Address"
									className="w-full px-4 py-3 rounded-lg bg-[#e7def7] mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
									autoFocus
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className="mt-4">
								<label className="block text-gray-700 dark:text-white"> Password </label>
								<input
									type="password"
									placeholder="Enter Password"
									minLength={8}
									className="w-full px-4 py-3 rounded-lg bg-[#e7def7] mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
									autoFocus
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							<div className="mt-4">
								<label className="block text-gray-700 dark:text-white"> Confirm Password </label>
								<input
									type="password"
									placeholder="Enter Confirm Password"
									minLength={8}
									className="w-full px-4 py-3 rounded-lg bg-[#e7def7] mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
									autoFocus
									required
								/>
							</div>
							<button
								type="submit"
								className="w-full block bg-[#9333ea] hover:bg-[#4c1b7a] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 text-white font-semibold rounded-lg px-4 py-3 mt-6"
							>
								Sign In
							</button>
						</form>

						<hr className="my-6 border-gray-300 w-full" />
						<p className="mt-2 dark:text-white">
							Have an account?
							<Link to={'/login'}>
								<a className="text-blue-500 ml-1 hover:text-blue-700 font-semibold">Log in</a>
							</Link>
						</p>
					</div>
				</div>
				<nav className="absolute top-0 left-0 right-0 p-4 flex justify-between w-full">
					<Link to={'/'}>
						<button className="text-white bg-indigo-600 px-4 py-2 rounded-lg">Back</button>
					</Link>
					<div className="flex items-center text-black dark:text-white">
						<Dropdown
							options={['light', 'dark', 'system']}
							onSelect={handleSelect}
							className="px-3 border rounded"
							defaultOption={theme}
						/>
					</div>
				</nav>
			</section>
		</>
	)
}

export default RegisterPage

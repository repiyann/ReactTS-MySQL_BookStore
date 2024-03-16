import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import api, { fetchCSRFToken } from '../../api/api.ts'
import Dropdown from '../../components/dropdown'
import { useTheme } from '../../utils/useTheme'
import authImage from '/images/auth-image.svg'

function LoginPage() {
	const [username, setUsername] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [errorMessage, setErrorMessage] = useState<string>('')
	const [csrfToken, setCSRFToken] = useState<string>('')
	const { theme, setTheme } = useTheme()
	const navigate = useNavigate()
	const { enqueueSnackbar } = useSnackbar()

	function handleSelect(option: string) {
		option === 'light' || option === 'dark' || option === 'system' ? setTheme(option) : null
	}

	useEffect(() => {
		async function getCSRFToken() {
			const token = await fetchCSRFToken()
			setCSRFToken(token)
		}
		getCSRFToken()
	}, [])

	function handleLogin() {
		const data = {
			username,
			password
		}

		api
			.post('http://localhost:8080/auth/login', data, {
				headers: {
					'X-CSRF-TOKEN': csrfToken
				}
			})
			.then(() => {
				enqueueSnackbar('Successfully logged in', { variant: 'success' })
				navigate('/login')
				setErrorMessage('')
			})
			.catch((error) => {
				error.response && error.response.status === 400
					? setErrorMessage('Invalid username or password')
					: enqueueSnackbar(`Error: ${error.message}`, { variant: 'error' })
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
						<h1 className="text-xl dark:text-white md:text-2xl font-bold leading-tight mt-12">
							Log in to your account
						</h1>
						{errorMessage && <p className="text-red-500">{errorMessage}</p>}

						<form
							className="mt-6"
							method="POST"
							onSubmit={(e) => {
								e.preventDefault()
								handleLogin()
							}}
						>
							<div>
								<label className="block text-gray-700 dark:text-white"> Username </label>
								<input
									type="text"
									name="name"
									placeholder="Enter Username"
									className="w-full px-4 py-3 rounded-lg bg-[#e7def7] mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
									autoFocus
									required
									value={username}
									onChange={(e) => setUsername(e.target.value)}
								/>
							</div>
							<div className="mt-4">
								<label className="block text-gray-700 dark:text-white"> Password </label>
								<input
									type="password"
									name="password"
									placeholder="Enter Password"
									minLength={8}
									className="w-full px-4 py-3 rounded-lg bg-[#e7def7] mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
									autoFocus
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							<button
								type="submit"
								className="w-full block bg-[#9333ea] hover:bg-[#4c1b7a] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 text-white font-semibold rounded-lg px-4 py-3 mt-6"
							>
								Log In
							</button>
						</form>

						<hr className="my-6 border-gray-300 w-full" />
						<div className="mt-2 dark:text-white items-center flex">
							Don't have an account?
							<Link
								to={'/register'}
								className="text-blue-500 ml-1 hover:text-blue-700 font-semibold"
							>
								Sign in
							</Link>
						</div>
					</div>
				</div>

				<nav className="absolute top-0 left-0 right-0 p-4 flex justify-between w-full">
					<Link
						to={'/'}
						className="text-white bg-indigo-600 px-4 py-2 rounded-lg"
					>
						Back
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

export default LoginPage

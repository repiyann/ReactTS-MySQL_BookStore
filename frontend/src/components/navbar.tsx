import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShieldHeart } from '@fortawesome/free-solid-svg-icons'
import { useTheme } from '../utils/useTheme.tsx'
import Dropdown from './dropdown.tsx'

function Navbar() {
	const { theme, setTheme, actualTheme } = useTheme()

	function handleSelect(option: string) {
		option === 'light' || option === 'dark' || option === 'system' ? setTheme(option) : null
	}

	function scrollToAbout() {
		const aboutSection = document.getElementById('about')
		aboutSection ? aboutSection.scrollIntoView({ behavior: 'smooth' }) : null
	}

	function scrollToHome() {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	function scrollToService() {
		const serviceSection = document.getElementById('menu')
		serviceSection ? serviceSection.scrollIntoView({ behavior: 'smooth' }) : null
	}

	return (
		<>
			<nav className="bg-light dark:bg-gray-950 shadow-lg dark:shadow-gray-900 sticky top-0 z-[1000]">
				<div className="pt-3 md:px-5 md:py-5 lg:px-28">
					<div className="flex justify-between pb-3 md:p-0">
						<a
							onClick={scrollToHome}
							className="flex items-center cursor-pointer dark:text-white"
						>
							<FontAwesomeIcon
								className="text-[#9333ea]"
								size="2xl"
								icon={faShieldHeart}
							/>
							<p className="hidden md:block ml-2 text-2xl font-bold text-[#9333ea]"> GrinWell Clinic </p>
						</a>
						<div className="hidden md:flex items-center">
							<p className="text-black dark:text-white md:px-3">Actual Theme: {actualTheme}</p>
							<Dropdown
								options={['light', 'dark', 'system']}
								onSelect={handleSelect}
								className="px-3 border rounded"
								defaultOption={theme}
							/>
							<div>
								<a
									onClick={scrollToService}
									className="px-3 text-lg cursor-pointer font-semibold dark:hover:text-[#9333ea] dark:text-white"
								>
									Services
								</a>
							</div>
							<div>
								<a
									onClick={scrollToAbout}
									className="pl-3 pr-5 text-lg cursor-pointer font-semibold dark:hover:text-[#9333ea] dark:text-white"
								>
									About Us
								</a>
							</div>
							<div>
								<Link to={'/register'}>
									<p className="px-5 py-2 text-white text-lg font-semibold bg-[#9333ea] rounded-lg hover:bg-[#4c1b7a] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
										Book Now
									</p>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</>
	)
}

export default Navbar

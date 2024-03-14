import Dropdown from './dropdown.tsx'
import { useTheme } from './useTheme.tsx'

function Navbar() {
	const { theme, setTheme } = useTheme()

	function handleSelect(option: string) {
		if (option === 'light' || option === 'dark' || option === 'system') {
			setTheme(option)
		}
	}

	return (
		<>
			<nav className="bg-white dark:bg-gray-950 shadow-lg dark:shadow-gray-900 sticky top-0 z-[1000]">
				<div className="pt-3 md:px-5 md:py-5 lg:px-28">
					<div className="flex justify-between pb-3 md:p-0">
						<a
							href="#"
							className="flex items-center"
						>
							<p className="hidden md:block ml-2 text-2xl font-bold dark:text-white"> GrinWell Clinic </p>
						</a>

						<div className="hidden md:block">
							<p className="text-black dark:text-white">Current Theme: {theme}</p>
							<Dropdown
								options={['light', 'dark', 'system']}
								onSelect={handleSelect}
								className="custom-dropdown"
								defaultOption={theme}
								disableSelectOption={false}
							/>
							<a
								href="#menu"
								className="px-3 text-lg font-semibold dark:hover:text-[#9333ea] dark:text-white"
							>
								Services
							</a>
							<a
								href="#about"
								className="pl-3 pr-5 text-lg font-semibold dark:hover:text-[#9333ea] dark:text-white"
							>
								About Us
							</a>
							<a
								href="#"
								className="px-5 py-2 text-white text-lg font-semibold bg-[#9333ea] rounded-lg hover:bg-[#4c1b7a] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
							>
								Book Now
							</a>
						</div>
					</div>
				</div>
			</nav>
		</>
	)
}

export default Navbar

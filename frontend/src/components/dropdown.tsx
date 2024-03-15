import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDisplay, faMoon, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { faSun } from '@fortawesome/free-regular-svg-icons'
import '../index.css'

interface DropdownProps {
	options: string[]
	onSelect: (option: string) => void
	className?: string
	defaultOption?: string
}

function Dropdown({ options, onSelect, className, defaultOption }: DropdownProps) {
	const [selectedOption, setSelectedOption] = useState<string | null>(null)
	const [isOpen, setIsOpen] = useState(false)
	const [opened, setOpened] = useState(false)

	useEffect(() => {
		defaultOption && !selectedOption && opened && (setSelectedOption(defaultOption), onSelect(defaultOption))
	}, [defaultOption, onSelect, selectedOption, opened])

	function handleOptionClick(option: string) {
		setSelectedOption(option)
		setIsOpen(false)
		onSelect(option)
		setOpened(false)
	}

	return (
		<div className={`${className || ''}`}>
			<div
				className="cursor-pointer text-black dark:text-white"
				onClick={() => {
					setIsOpen(!isOpen)
					setOpened(true)
				}}
			>
				{isOpen ? (
					selectedOption !== null && selectedOption !== '' ? (
						'Select an option'
					) : (
						selectedOption
					)
				) : (
					<>
						<FontAwesomeIcon
							className="pr-2"
							icon={defaultOption === 'dark' ? faMoon : defaultOption === 'light' ? faSun : faDisplay}
						/>
						{selectedOption || defaultOption}
					</>
				)}
				<span className="pl-2">
					<FontAwesomeIcon
						icon={faChevronDown}
						className={isOpen ? 'rotate-up' : 'rotate-down'}
					/>
				</span>
			</div>
			{isOpen && (
				<div className="absolute z-10 bg-green-300">
					{options.map((option, index) => (
						<div
							key={index}
							className="border-b"
						>
							<button
								onClick={() => {
									handleOptionClick(option)
								}}
								className="px-4 text-black dark:text-black"
								disabled={selectedOption === option}
							>
								<FontAwesomeIcon
									className="pr-2"
									icon={option === 'dark' ? faMoon : option === 'light' ? faSun : faDisplay}
								/>
								{option}
							</button>
						</div>
					))}
				</div>
			)}
		</div>
	)
}

export default Dropdown

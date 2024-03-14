import { useState, useEffect } from 'react'

interface DropdownProps {
	options: string[]
	onSelect: (option: string) => void
	className?: string
	defaultOption?: string
	disableSelectOption?: boolean
}

function Dropdown({ options, onSelect, className, defaultOption, disableSelectOption }: DropdownProps) {
	const [selectedOption, setSelectedOption] = useState<string | null>(null)
	const [isOpen, setIsOpen] = useState(false)
	const [opened, setOpened] = useState(false)

	useEffect(() => {
		if (defaultOption && !selectedOption && opened) {
			setSelectedOption(defaultOption)
			onSelect(defaultOption)
		}
	}, [defaultOption, onSelect, selectedOption, opened])

	function handleOptionClick(option: string) {
		setSelectedOption(option)
		setIsOpen(false)
		onSelect(option)
		setOpened(false)
	}

	return (
		<div className={`dropdown ${className || ''}`}>
			<div
				className="dropdown-toggle text-black dark:text-white"
				onClick={() => {
					setIsOpen(!isOpen)
					setOpened(true)
				}}
			>
				{selectedOption !== null && selectedOption !== '' && opened
					? 'Select an option'
					: selectedOption
					? selectedOption
					: defaultOption || 'System Preference'}
				<span className={`arrow ${isOpen ? 'open' : ''}`}>&#9660;</span>
			</div>
			{isOpen && (
				<div className="dropdown-menu">
					{options.map((option, index) => (
						<div key={index}>
							<button
								onClick={() => {
									handleOptionClick(option)
								}}
								className={`dropdown-item text-black dark:text-white ${
									selectedOption === option && disableSelectOption ? 'disabled' : ''
								}`}
								disabled={selectedOption === option && disableSelectOption}
							>
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

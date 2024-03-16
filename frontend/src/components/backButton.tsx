import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

function BackButton() {
	return (
		<div className="flex">
			<Link
				to={'/'}
				className="bg-sky-800 text-white py-1 px-4 rounded-lg w-fit"
			>
				<FontAwesomeIcon icon={faArrowLeft} />
			</Link>
		</div>
	)
}

export default BackButton

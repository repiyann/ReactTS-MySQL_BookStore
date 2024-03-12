import { Link } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'

function BackButton() {
	return (
		<div className="flex">
			<Link
				to={'/'}
				className="bg-sky-800 text-white py-1 px-4 rounded-lg w-fit"
			>
				<BsArrowLeft className="text-2xl" />
			</Link>
		</div>
	)
}

export default BackButton

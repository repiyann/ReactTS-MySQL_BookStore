import { useState } from 'react'
import axios from 'axios'
import { useSnackbar } from 'notistack'
import { useNavigate, useParams } from 'react-router-dom'
import BackButton from '../components/backButton'
import Spinner from '../components/spinner'

function DeleteBook() {
	const [loading, setLoading] = useState<boolean>(false)
	const navigate = useNavigate()
	const { id } = useParams<{ id: string }>()
	const { enqueueSnackbar } = useSnackbar()

	function handleDeleteBook() {
		setLoading(true)
		axios
			.delete(`http://localhost:8080/books/delete/${id}`)
			.then(() => {
				setLoading(false)
				enqueueSnackbar('Book deleted successfully', { variant: 'success' })
				navigate('/')
			})
			.catch((error) => {
				setLoading(false)
				enqueueSnackbar('Error', { variant: 'error' })
				console.log(error)
			})
	}

	return (
		<div className="p-4">
			<BackButton />
			<h1 className="text-3xl my-4">Delete Book</h1>
			{loading ? <Spinner /> : ''}
			<div className="flex flex-col items-center border-2 border-sky-400 rounded-xl p-8 mx-auto w-[600px]">
				<h3 className="text-2xl">Are you sure you want to delete this?</h3>
				<button
					className="p-4 bg-red-600 text-white m-8 w-full"
					onClick={handleDeleteBook}
				>
					Yes, delete it
				</button>
			</div>
		</div>
	)
}

export default DeleteBook

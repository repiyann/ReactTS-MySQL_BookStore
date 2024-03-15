import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import BackButton from '../components/backButton'
import Spinner from '../components/spinner'

function EditBook() {
	const [title, setTitle] = useState<string>('')
	const [author, setAuthor] = useState<string>('')
	const [publishYear, setPublishYear] = useState<number | null>(null)
	const [loading, setLoading] = useState<boolean>(false)
	const { id } = useParams<{ id: string }>()
	const { enqueueSnackbar } = useSnackbar()
	const navigate = useNavigate()

	useEffect(() => {
		setLoading(true)
		axios
			.get(`http://localhost:8080/books/edit/${id}`)
			.then((response) => {
				setTitle(response.data.book.title)
				setAuthor(response.data.book.author)
				setPublishYear(response.data.book.publishYear)
				setLoading(false)
			})
			.catch((error) => {
				console.log(error)
				setLoading(false)
				enqueueSnackbar(`Error: ${error.message}`, { variant: 'error' })
			})
	}, [id, enqueueSnackbar])

	function handleEditBook() {
		const data = {
			title,
			author,
			publishYear
		}
		setLoading(true)
		axios
			.put(`http://localhost:8080/books/edited/${id}`, data)
			.then(() => {
				setLoading(false)
				navigate('/')
				enqueueSnackbar('Book edited successfully', { variant: 'success' })
			})
			.catch((error) => {
				setLoading(false)
				console.log(error)
				enqueueSnackbar(`Error: ${error.message}`, { variant: 'error' })
			})
	}

	return (
		<div className="p-4">
			<BackButton />
			<h1 className="text-3xl my-4">Edit Book</h1>
			{loading ? <Spinner /> : ''}
			<div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
				<div className="my-4">
					<label className="text-xl mr-4 text-gray-500">Title</label>
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="border-2 border-gray-500 px-4 py-2 w-full"
					/>
				</div>
				<div className="my-4">
					<label className="text-xl mr-4 text-gray-500">Author</label>
					<input
						type="text"
						value={author}
						onChange={(e) => setAuthor(e.target.value)}
						className="border-2 border-gray-500 px-4 py-2 w-full"
					/>
				</div>
				<div className="my-4">
					<label className="text-xl mr-4 text-gray-500">Publish Year</label>
					<input
						type="number"
						value={publishYear === null ? '' : publishYear}
						onChange={(e) => setPublishYear(Number(e.target.value) || null)}
						className="border-2 border-gray-500 px-4 py-2 w-full"
					/>
				</div>
				<button
					className="p-2 bg-sky-300 m-8"
					onClick={handleEditBook}
				>
					Edit
				</button>
			</div>
		</div>
	)
}

export default EditBook

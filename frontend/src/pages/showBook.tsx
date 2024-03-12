import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import BackButton from '../components/backButton'
import Spinner from '../components/spinner'

interface Book {
	id: number
	author: string
	title: string
	publishYear: number
	createdAt: Date
	updatedAt: Date
}

function ShowBook() {
	const [book, setBook] = useState<Book | Record<string, never>>({})
	const [loading, setLoading] = useState<boolean>(false)
	const { id } = useParams<{ id: string }>()

	useEffect(() => {
		setLoading(true)
		axios
			.get(`http://localhost:8080/books/detail/${id}`)
			.then((response) => {
				setBook(response.data.book)
				setLoading(false)
			})
			.catch((error) => {
				console.log(error)
				setLoading(false)
			})
	}, [id])

	return (
		<div className="p-4">
			<BackButton />
			<h1 className="text-3xl my-4"></h1>
			{loading ? (
				<Spinner />
			) : (
				<div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
					<div className="my-4">
						<span className="text-xl mr-4 text-gray-500">ID</span>
						<span>{book.id}</span>
					</div>
					<div className="my-4">
						<span className="text-xl mr-4 text-gray-500">Title</span>
						<span>{book.title}</span>
					</div>
					<div className="my-4">
						<span className="text-xl mr-4 text-gray-500">Author</span>
						<span>{book.author}</span>
					</div>
					<div className="my-4">
						<span className="text-xl mr-4 text-gray-500">Publish Year</span>
						<span>{book.publishYear}</span>
					</div>
					<div className="my-4">
						<span className="text-xl mr-4 text-gray-500">Create Time</span>
						<span>{new Date(book.createdAt).toString()}</span>
					</div>
					<div className="my-4">
						<span className="text-xl mr-4 text-gray-500">Last Update Time</span>
						<span>{new Date(book.updatedAt).toString()}</span>
					</div>
				</div>
			)}
		</div>
	)
}

export default ShowBook

import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Home from './pages/home'
import CreateBook from './pages/createBook'
import ShowBook from './pages/showBook'
import EditBook from './pages/editBook'
import DeleteBook from './pages/deleteBook'
import RegisterPage from './pages/auth/register'
import LoginPage from './pages/auth/login'

function App() {
	return (
		<Routes>
			<Route
				path="/"
				element={<Dashboard />}
			/>
			<Route
				path="/books/home"
				element={<Home />}
			/>
			<Route
				path="/books/create"
				element={<CreateBook />}
			/>
			<Route
				path="/books/detail/:id"
				element={<ShowBook />}
			/>
			<Route
				path="/books/edit/:id"
				element={<EditBook />}
			/>
			<Route
				path="/books/delete/:id"
				element={<DeleteBook />}
			/>
			<Route
				path="/register"
				element={<RegisterPage />}
			/>
			<Route
				path="/login"
				element={<LoginPage />}
			/>
		</Routes>
	)
}

export default App

import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { SnackbarProvider, closeSnackbar, SnackbarKey } from 'notistack'
import { AiOutlineClose } from 'react-icons/ai'
import { ThemeProvider } from './components/themeProvider.tsx'
import './index.css'

function closeSnackbarHandle(key: SnackbarKey) {
	return (
		<button onClick={() => closeSnackbar(key)}>
			<AiOutlineClose className="text-white cursor-pointer" />
		</button>
	)
}

ReactDOM.createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<ThemeProvider>
			<SnackbarProvider action={closeSnackbarHandle}>
				<App />
			</SnackbarProvider>
		</ThemeProvider>
	</BrowserRouter>
)

import ReactDOM from 'react-dom/client'
import axios from 'axios'
import { BrowserRouter } from 'react-router-dom'
import { SnackbarProvider, closeSnackbar, SnackbarKey } from 'notistack'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import App from './App.tsx'
import ThemeProvider from './utils/themeProvider.tsx'
import './index.css'

axios.defaults.withCredentials = true

function closeSnackbarHandle(key: SnackbarKey) {
	return (
		<button onClick={() => closeSnackbar(key)}>
			<FontAwesomeIcon
				icon={faXmark}
				className="text-white cursor-pointer"
			/>
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

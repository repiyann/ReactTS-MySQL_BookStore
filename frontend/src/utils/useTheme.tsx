import { useContext } from 'react'
import { ThemeContext } from './themeProvider'

export function useTheme() {
	const context = useContext(ThemeContext)
	if (!context) {
		throw new Error('useTheme function must be used within a ThemeProvider component')
	}
	return context
}

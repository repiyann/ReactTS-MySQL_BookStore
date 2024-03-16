import { createContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

export interface ThemeContextType {
	theme: Theme
	setTheme: (newTheme: Theme) => void
	actualTheme: Theme
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [theme, setThemeState] = useState<Theme>(() => {
		const savedTheme = localStorage.getItem('theme')
		return (savedTheme as Theme) || 'system'
	})
	const [actualTheme, setActualTheme] = useState<Theme>(() => {
		const savedTheme = localStorage.getItem('theme')
		return (savedTheme as Theme) || 'system'
	})

	function setTheme(newTheme: Theme) {
		setThemeState(newTheme)
		newTheme !== 'system'
			? (setActualTheme(newTheme), localStorage.setItem('theme', newTheme))
			: localStorage.removeItem('theme')
	}

	useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
		const listener = () => {
			theme === 'system' ? setActualTheme(mediaQuery.matches ? 'dark' : 'light') : null
		}
		listener()

		mediaQuery.addEventListener('change', listener)
		return () => mediaQuery.removeEventListener('change', listener)
	}, [theme])

	useEffect(() => {
		const html = document.documentElement
		html.classList.remove('light', 'dark')
		html.classList.add(actualTheme)
	}, [actualTheme])

	const contextValue: ThemeContextType = {
		theme,
		setTheme,
		actualTheme
	}

	return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
}

export default ThemeProvider

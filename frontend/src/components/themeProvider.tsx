import { createContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

export interface ThemeContextType {
	theme: Theme
	setTheme: (newTheme: Theme) => void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
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
		if (newTheme !== 'system') {
			setActualTheme(newTheme)
			localStorage.setItem('theme', newTheme)
		} else {
			localStorage.removeItem('theme')
		}
	}

	useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
		const listener = () => {
			if (theme === 'system') {
				setActualTheme(mediaQuery.matches ? 'dark' : 'light')
			}
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
		setTheme
	}

	return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
}

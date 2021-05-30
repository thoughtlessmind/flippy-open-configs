import React from 'react'

const getInitialTheme = (): string => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedPrefs = window.localStorage.getItem('color-theme')
    if (typeof storedPrefs === 'string') {
      return storedPrefs
    }

    const userMedia = window.matchMedia('(prefers-color-scheme: dark)')
    if (userMedia.matches) {
      return 'dark'
    }
  }

  return 'dark'
}

interface ThemeContextType {
  theme: 'light' | 'dark'
  setTheme: (theme: string) => void
}

export const ThemeContext = React.createContext({} as ThemeContextType)

type ThemeProviderProps = {
  initialTheme: 'light' | 'dark'
  children: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = (props) => {
  const { initialTheme, children } = props
  const [theme, setTheme] = React.useState<string>(getInitialTheme)

  const rawSetTheme = (theme: string) => {
    const root = window.document.documentElement
    const isDark = theme === 'dark'

    root.classList.remove(isDark ? 'light' : 'dark')
    root.classList.add(theme)

    localStorage.setItem('color-theme', theme)
  }

  if (initialTheme) {
    rawSetTheme(initialTheme)
  }

  React.useEffect(() => {
    rawSetTheme(theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

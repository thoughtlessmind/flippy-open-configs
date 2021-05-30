import Header from './Header/Header'
import './style.scss'
import './styles.css'
import 'tailwindcss/tailwind.css'
import { ThemeProvider } from './theme/themeContext.js'

export const App = () => {
  return (
    <ThemeProvider>
      <Header />
      <h1>React TypeScript Webpack Starter Template</h1>
      <p style={{ color: 'red' }}>ss</p>
    </ThemeProvider>
  )
}

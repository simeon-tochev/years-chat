import * as React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { ChakraProvider } from '@chakra-ui/react'
import { ThemeProvider } from './context/ThemeProvider'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>
    <ChakraProvider>
    <ThemeProvider >
      <App />
    </ThemeProvider>
    </ChakraProvider>
  </React.StrictMode>
)

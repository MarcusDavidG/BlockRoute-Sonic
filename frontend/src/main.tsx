import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'leaflet/dist/leaflet.css'
import './styles/leaflet.css'
import { ThirdwebAppProvider } from './providers/ThirdwebProvider'
import { ThemeProvider } from './providers/ThemeProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThirdwebAppProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ThirdwebAppProvider>
  </React.StrictMode>,
)

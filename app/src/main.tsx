import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './app/App'
import { AuthProvider } from './features/auth'
import { NotificationProvider } from './shared/context/NotificationContext'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NotificationProvider>
      <AuthProvider>
        <App/>
      </AuthProvider>
    </NotificationProvider>
  </StrictMode>,
)

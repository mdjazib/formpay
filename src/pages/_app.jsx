import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '../contexts/AuthContext'
import '../styles/globals.scss'
import '../styles/components.scss'

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: '8px',
            background: '#161616',
            color: '#fff',
            fontSize: '0.875rem',
            fontFamily: 'Inter, sans-serif',
          },
          success: {
            iconTheme: { primary: '#24A148', secondary: '#fff' },
          },
          error: {
            iconTheme: { primary: '#DA1E28', secondary: '#fff' },
          },
        }}
      />
    </AuthProvider>
  )
}

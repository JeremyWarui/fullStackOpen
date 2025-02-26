import ReactDOM from 'react-dom/client'
import { HeroUIProvider } from '@heroui/react'
import { ContextProvider } from './Context'
import { UserContextProvider } from './UserContext'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserContextProvider>
    <ContextProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <HeroUIProvider>
            <main className="purple-dark text-foreground bg-background">
              <App />
            </main>
          </HeroUIProvider>
        </Router>
      </QueryClientProvider>
    </ContextProvider>
  </UserContextProvider>
)

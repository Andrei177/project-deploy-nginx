import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AppRouter from './routing/AppRouter.jsx'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <QueryClientProvider client={queryClient} >
          <AppRouter/>
      </QueryClientProvider>
  </BrowserRouter>,
)

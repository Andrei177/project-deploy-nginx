import { BrowserRouter } from 'react-router-dom'
import AppRouter from './routing/AppRouter'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
//'https://jsonplaceholder.typicode.com/todos'

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      }
    }
  })
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppRouter/>
      </QueryClientProvider>
    </BrowserRouter>
  )
}
export default App;
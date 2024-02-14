import { useState } from 'react';
import './App.css'
import { useQuery, keepPreviousData} from '@tanstack/react-query';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
//'https://jsonplaceholder.typicode.com/todos'

function App() {
  const limit = 5;
  const [page, setPage] = useState(1);

  const fetchTodo = async (page, limit) => {
    const {data} = await axios.get('https://jsonplaceholder.typicode.com/todos', 
    {
      params: {
      _limit: limit,
      _page: page
    }});
    return data;
  }

  const {data, isError, error, isFetching, isLoading} = useQuery({
    queryKey: ['todos', page, limit], 
    queryFn: () => fetchTodo(page, limit),
    refetchOnWindowFocus: true, //Свойство для повторного запроса когда перешёл на другую вкладку и вернулся обратно
    placeholderData: keepPreviousData //Свойсво для того чтобы пока не придут новые данные отображать старые (из-за этого isLoading ведёт себя немного по-другому)
  });

  return (
    <>
      <h1>Список дел</h1>
      <button onClick={() => {if(page > 1)setPage(prev => prev - 1)}}>Назад</button>
      <button onClick={() => setPage(prev => prev + 1)}>Далее</button>
      {isError && <h2>{error.message}</h2>}
      {isLoading && <Skeleton count={5} height={48}/>}
      <ul style={{listStyleType: "none"}}>
      {
        data && data.map((todo) => {
          return <li style={{border: "1px solid green", padding: 10, display: "flex", justifyContent: "space-between"}} key={todo.id} ><div>
            <h2 style={{display: "inline"}}>{todo.id}. </h2>
            <h2 style={{display: "inline"}}>{todo.title}</h2>
            </div>
            </li>
        })
      }
      </ul>
      {isFetching && <h2>Идеёт подгрузка todos...</h2>}
      </>
  )
}

export default App

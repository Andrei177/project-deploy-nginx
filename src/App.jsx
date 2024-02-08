import { useState } from 'react';
import './App.css'
import { useQuery, keepPreviousData, useMutation, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
//'https://jsonplaceholder.typicode.com/todos'

function App() {
  const [start, setStart] = useState(0);
  const limit = 5;

  const queryClient = useQueryClient();//хук для использования квери клиента, который проброшен в квериКлиентПровайдер в main.jsx 

  //Три функции ниже для отправки запросов.
  //Эти функции передаём в хуки useQuery или useMutation в зависимости от типа запроса
  const fetchTodo = async (start, limit) => {
    const {data} = await axios.get('http://localhost:4000/todos', {params: {
      _limit: limit,
      _start: start
    }});
    return data;
  }
  const createTodo = (newTodo) => {
    return axios.post('http://localhost:4000/todos', newTodo);
  }
  const deleteTodo = (todoId) => {
    return axios.delete('http://localhost:4000/todos' + `/${todoId}`)
  }

  const {data, isError, error, isFetching, isLoading} = useQuery({
    queryKey: ['todos', start, limit], 
    queryFn: () => fetchTodo(start, limit),
    refetchOnWindowFocus: true, //Свойство для повторного запроса когда перешёл на другую вкладку и вернулся обратно
    placeholderData: keepPreviousData //Свойсво для того чтобы пока не придут новые данные отображать старые (из-за этого isLoading ведёт себя немного по-другому)
  });

  const mutationForCreate = useMutation({
    mutationFn: (todo) => createTodo(todo),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['todos']})
    }
  });
  const mutationForDelete = useMutation({
    mutationFn: (id) => deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['todos']})
    }
  });

  const addNewTodo = () => {
    const title = String(prompt());
    const newTodo = {title, completed: false};
    mutationForCreate.mutate(newTodo);
  }

  return (
    <>
      <h1>Список дел</h1>
      <button onClick={addNewTodo}>Добавить новое дело</button>
      <button onClick={() => {if(start > 1)setStart(prev => prev - 5)}}>Назад</button>
      <button onClick={() => setStart(prev => prev + 5)}>Далее</button>
      {isError && <h2>{error.message}</h2>}
      {isLoading && <Skeleton count={5} height={48}/>}
      <ul style={{listStyleType: "none"}}>
      {
        data && data.map((todo) => {
          return <li style={{border: "1px solid green", padding: 10, display: "flex", justifyContent: "space-between"}} key={todo.id} ><div>
            <h2 style={{display: "inline"}}>{todo.id}. </h2>
            <h2 style={{display: "inline"}}>{todo.title}</h2>
            </div>
            <button onClick={() => mutationForDelete.mutate(todo.id)}>x</button>
            </li>
        })
      }
      </ul>
      {isFetching && <h2>Идеёт подгрузка todos...</h2>}
      </>
  )
}

export default App

import React from 'react'
import { useSearchParams } from 'react-router-dom'

const Welcome = () => {
    const [SearchParams] = useSearchParams();
    const params = SearchParams.get('id');
  return (
    <div>
      <h1 style={{textAlign: "center", padding: 10}}>Welcome for my project!</h1>
      {
        params && <h2>Вы ввели id = {params}</h2>
      }
    </div>
  )
}

export default Welcome

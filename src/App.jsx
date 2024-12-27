import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const {count, increment, decrement} = useCounter(0, 5);

  const { loading: loading1, data: data1 } = useFetch("http://localhost:3000/data");
  const { loading: loading2, data: data2 } = useFetch("http://localhost:3001/data");
  const { loading: loading3, data: data3 } = useFetch("http://localhost:3002/data");

  return (
    <div>
      <div>count : {count}</div>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
      {!loading1 && (
        <ul>
          {data1.map((el) => (
            <li key={'data1' + el.id}>{el.content}</li>
          ))}
        </ul>
      )}
      {!loading2 && (
        <ul>
          {data2.map((el) => (
            <li key={'data2' + el.id}>{el.content}</li>
          ))}
        </ul>
      )}
      {!loading3 && (
        <ul>
          {data3.map((el) => (
            <li key={'data3' + el.id}>{el.content}</li>
          ))}
        </ul>
      )}
      
    </div>
  )
}

const useFetch = (url) => {
  const [loading, setLoading] =useState(true)
  const [data, setData] =useState(null)
  const [error, setError] =useState(null)

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => { 
        setData(res)
        setLoading(false)
      })
      .catch((error) => {
        setError(err)
        setLoading(false)
      })
  }, [url])

  return{loading, data, error};
}



const useCounter = (initialValue = 0, step = 1) => {
  const [count, setCount] = useState(initialValue);

  const decrement = () => setCount((prev) => prev - step );
  const increment = () => setCount((prev) => prev + step );

  return {count, increment, decrement};
}

export default App

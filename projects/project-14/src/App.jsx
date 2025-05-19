import { useState } from 'react'
import './App.css'
import { useRef } from 'react'

function App() {
  const [count, setCount] = useState(0)
  const ref = useRef(0)

  const handleIncrement = () => {
    const newValue = count + 1
    setCount(newValue)
    ref.current++
    console.log('ref', ref.current)
    // console.log('countState', count)
  }

  return (
    <>
      <h1>test</h1>
      <p>{ref.current}</p>
      <button onClick={handleIncrement}>Add 1</button>
    </>
  )
}

export default App

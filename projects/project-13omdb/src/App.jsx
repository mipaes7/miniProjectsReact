import { useEffect, useRef, useState } from 'react'
import { useMovies } from './hooks/useMovies'
import Movies from './components/Movies'
import './App.css'

export const useSearch = () => {
  const [query, setQuery] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {

    if (isFirstInput.current) {
      isFirstInput.current = query === ''
      return
    }

    if (query === '') {
      setError('No se puede buscar una película vacía')
      return
    }

    if (query.match(/^\d+$/)) {
      setError('Valor de búsqueda no válido')
      return
    }

    if (query.length < 3) {
      setError('Valor de búsqueda muy corto')
      return
    }

    setError(null)
  }, [query])

  return {
    query,
    setQuery,
    error,
  }
}

function App() {

  const { error, query, setQuery } = useSearch()
  const { movies, getMovies } = useMovies({query})

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies()
  }

  const handleChange = (event) => {
    const newQuery = event.target.value
    setQuery(newQuery)
  }

  return (
    <>
      <h1>Prueba técnica movies</h1>
      <header>
        <form onSubmit={handleSubmit}>
          <input
            style={{ border: '1px solid transparent', borderColor: error ? 'red' : 'transparent' }}
            onChange={handleChange}
            value={query}
            type='text'
            placeholder='Lord of the Rings, Gladiator..'
          />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>
      <main>
        <Movies movies={movies} />
      </main>
    </>
  )
}

export default App

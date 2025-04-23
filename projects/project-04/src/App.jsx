import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import './App.css'

function App() {

  const { movies } = useMovies()
  const { inputRef, query, error, handleChange, handleSubmit } = useSearch()

  return (
    <>
      <h1>Prueba técnica</h1>
      <hr />
      <div className='page'>
        <header>
          <form onSubmit={handleSubmit} className='form'>
            <input onChange={handleChange} value={query} name='query' ref={inputRef} type='text' placeholder='LOTR, Star Wars...' />
            <button type='submit'>Buscar</button>
          </form>
          {error && <p style={{color: 'red'}}>{error}</p>}
        </header>
        <main>
          <h3>Resultados</h3>
          <hr />
          <section className='resultados-container'>
            <Movies movies={movies}/>
          </section>
        </main>
      </div>
    </>
  )
}

export default App

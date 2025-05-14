import './App.css'
import Movies from './components/Movies'
import { useMovies } from './hooks/useMovies'

function App() {

  const { movies } = useMovies()

  return (
    <>
      <h1>Prueba técnica movies</h1>
      <header>
        <form>
          <input type='text' placeholder='Lord of the Rings, Gladiator..' />
          <button type='submit'>Buscar</button>
        </form>
      </header>
      <main>
        <Movies movies={movies} />
      </main>
    </>
  )
}

export default App

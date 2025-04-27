import { useRef, useState, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/searchMovies'

export const useMovies = ({ sort }) => {
  const [movies, setMovies] = useState([])
  const previousQuery = useRef()

  const getMovies = useCallback(
    async (query) => {
      if (query === previousQuery.current) return
      const newMovies = await searchMovies(query)
      previousQuery.current = query
      setMovies(newMovies)
    }
    , [])

  //* sin el usememo este método se estaría usando cada vez que se necesite renderizar todo el componente, así solo hace cuando cambien las dependecias
  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies
  }, [sort, movies])

  return {
    movies: sortedMovies, getMovies
  }
}
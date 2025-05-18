import { useCallback, useMemo, useRef, useState } from 'react'
import { searchMovies } from '../services/movies'

export const useMovies = ({ query, sort }) => {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const prevQuery = useRef(query)

    const getMovies = useCallback(async ({search}) => {
        if (search === prevQuery.current) return

        try {
            setLoading(true)
            setError(null)
            prevQuery.current = search
            const newMovies = await searchMovies({ query: search })
            setMovies(newMovies)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    })

    const sortedMovies = useMemo(() => {
        return sort
        ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
        : movies
    }, [movies, sort])


    return { movies: sortedMovies, getMovies, loading, error }
}
import { useState } from 'react'
import { searchMovies } from '../services/movies'

export const useMovies = ({ query }) => {
    const [movies, setMovies] = useState([])

    const getMovies = async () => {
            const newMovies = await searchMovies({query})
            setMovies(newMovies)
    }

    return { movies, getMovies }
}
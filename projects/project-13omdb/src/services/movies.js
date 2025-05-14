const API_KEY = '874f8362'

export const searchMovies = async ({ query }) => {

    if (query === '') return null

    try {
        const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`)
        const json = await res.json()
        const { Search } = json

        const mappedMovies = Search?.map(movie => (
            {
                id: movie.imdbID,
                title: movie.Title,
                year: movie.Year,
                poster: movie.Poster
            }
        ))

        return mappedMovies

    } catch (error) {
        throw new Error('Error searching movies')
    }


}
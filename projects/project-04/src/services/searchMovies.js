export const searchMovies = async (query) => {
    if (query === null) return 

    try {
        const resp = await fetch(`http://www.omdbapi.com/?apikey=4b19011d&s=${query}`)
        const json = await resp.json()
        const movies = json.Search
        const mappedMovies = movies?.map(movie => (
            {
              id: movie.imdbID,
              title: movie.Title,
              year: movie.Year,
              poster: movie.Poster
            }
          ))
        return mappedMovies
    } catch (error) {
        throw new Error('Error buscando películas')
    }
}
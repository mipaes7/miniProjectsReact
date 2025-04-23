import respMovies from '../mocks/with-results.json'

export const useMovies = () => {
  const movies = respMovies.Search

  const mappedMovies = movies?.map(movie => (
    {
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster
    }
  ))

  return {
    movies: mappedMovies
  }
}
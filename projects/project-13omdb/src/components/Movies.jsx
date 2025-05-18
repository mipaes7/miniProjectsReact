
const ListofMovies = ({ movies }) => {
    return (
        <ul>
            {
                movies.map(movie => (
                    <li key={movie.id}>
                        <h3>{movie.title}</h3>
                        <p>{movie.year}</p>
                        <img src={movie.poster} alt={movie.title} />
                    </li>
                ))
            }
        </ul>
    )
}

const NoResults = () => {
    return (
        <strong>No hay Resultados</strong>
    )
}

const Movies = ({ movies }) => {

    const hasMovies = movies?.length > 0

    return (
        hasMovies
        ? <ListofMovies movies={movies} />
        : <NoResults />
    )
}

export default Movies

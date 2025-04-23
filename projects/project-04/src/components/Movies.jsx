const MoviesList = ({movies}) => {
    return (
        <>
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
        </>
    )
}

const NoMovies = () => {
    return (
        <p>No hay Resultados</p>
    )
}

export const Movies = ({movies}) => {
    const hasMovies = movies?.length > 0

    return (
        hasMovies
        ? <MoviesList movies={movies} />
        : <NoMovies />
    )
}


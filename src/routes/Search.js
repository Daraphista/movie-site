import MovieAndTVCards from "../components/MovieAndTVCards";

const Search = (props) => {
  const { searchResultsMovies, searchResultsShows, getMovieId } = props;

  return (
    <div>
      <MovieAndTVCards 
        movies={searchResultsMovies}
        shows={searchResultsShows}
        getMovieId={getMovieId}
      />
    </div>
  )
}

export default Search;
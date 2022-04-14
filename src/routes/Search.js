import MovieResults from "../components/MovieResults";

const Search = (props) => {
  const { searchResults, getMovieId } = props;

  return (
    <div>
      <MovieResults 
        movies={searchResults} 
        getMovieId={getMovieId}
      />
    </div>
  )
}

export default Search;
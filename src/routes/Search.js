import MovieCards from "../components/MovieCards";

const Search = (props) => {
  const { searchResults, getMovieId } = props;

  return (
    <div>
      <MovieCards 
        movies={searchResults} 
        getMovieId={getMovieId}
      />
    </div>
  )
}

export default Search;
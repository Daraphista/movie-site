import MovieResults from "../components/MovieResults";

const Search = (props) => {
  const { searchResults } = props;

  return (
    <div>
      <MovieResults movies={searchResults} />
    </div>
  )
}

export default Search;
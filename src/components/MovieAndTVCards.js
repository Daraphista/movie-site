import styled from "styled-components";
import MovieCard from "./MovieCard";
import TVShowCard from "./TVShowCard";

const MovieAndTVCards = (props) => {
  const { movies, shows, getMovieId } = props;

  return (
    <MovieResultsContainer>
      {movies.map(movie => {
        return <MovieCard movie={movie} getMovieId={getMovieId} />
      })}
      {shows.map(show => {
        return <TVShowCard show={show} getMovieId={getMovieId} />
      })}
    </MovieResultsContainer>
  );
};

const MovieResultsContainer = styled.div`
  font-family: Arial, Helvetica, sans-serif;

  display: grid;
  grid-template-columns: repeat(auto-fit, 350px);
  gap: 1rem;
  justify-content: center;

  @media (max-width: 640px) {
    grid-template-columns: repeat(auto-fit, 150px);
  }
`

export default MovieAndTVCards;
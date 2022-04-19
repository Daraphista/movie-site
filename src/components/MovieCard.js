import styled from "styled-components";
import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MovieCard = (props) => {
  const { movie, getMovieId } = props;

  const navigate = useNavigate();

  return (
    <MovieCardContainer
      onClick={() => {
        getMovieId(movie.id);
        navigate("/movie-site/watch");
      }}
    >
      <MoviePoster poster={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} />
      <TitleCard>{movie.title} <FaPlay /></TitleCard>
    </MovieCardContainer>
  )
}

const MovieCardContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  
  height: 450px;  
  cursor: pointer;
  box-shadow: 0px 0px 4px;

  @media (max-width: 640px) {
    height: 220px;
  }
`

const MoviePoster = styled.div`
  flex: 1;
  background-image: ${(props) => `url(${props.poster})`};
  background-size: cover;
  background-position: center;
  
  ${MovieCardContainer}:hover & {
    filter: blur(5px)
  }
`

const TitleCard = styled.div`
  position: absolute;
  display: none;

  top: 50%;
  left: 50%;
  transform: translateX(-50%);

  font-size: 1.5rem;
  color: white;
  text-align: center;

  width: 100%;

  justify-content: center;
  align-items: center;
  gap: .5rem;
  
  ${MovieCardContainer}:hover & {
    display: flex;
    flex-direction: column;
  }
`

export default MovieCard;
import styled from "styled-components";
import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TVShowCard = (props) => {
  const { show, getMovieId } = props;

  const navigate = useNavigate();

  return (
    <TVShowCardContainer
      onClick={() => {
        getMovieId(show.id)
        navigate("/movie-site/watch-show");
      }}
    >
      <TVShowIndicator>TV</TVShowIndicator>
      <TVShowPoster poster={`https://image.tmdb.org/t/p/original/${show.poster_path}`} />
      <TitleCard>{show.name} <FaPlay /></TitleCard>
    </TVShowCardContainer>
  )
}

const TVShowCardContainer = styled.div`
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
  
  ${TVShowCardContainer}:hover & {
    display: flex;
    flex-direction: column;
  }
`

const TVShowPoster = styled.div`
  flex: 1;
  background-image: ${(props) => `url(${props.poster})`};
  background-size: cover;
  background-position: center;
  
  ${TVShowCardContainer}:hover & {
    filter: blur(5px)
  }
`

const TVShowIndicator = styled.div`
  position: absolute;
  top: 3%;
  right: 4%;

  color: white;
  background-color: #1c1d1f;
  padding: .5rem;
  
  border-radius: 5px;
  z-index: 999;

  ${TVShowCardContainer}:hover & {
    display: flex;
  }
`

export default TVShowCard;
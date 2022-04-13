import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import styled from "styled-components";
import Header from "../components/Header";

const Home = () => {
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  
  const getRecommendedMovies = async () => {
    try {
      const result = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=394a500dc1b768ebe40e5c02328b32bf");
      const data = await result.json();
      setRecommendedMovies(data.results);
      console.log(data);
    } catch (error) {
      console.log("Error:", error);
    }
  }

  useEffect(() => {
    getRecommendedMovies();
  }, [])

  return (
    <div>
      <Header />
      <RecommendedMoviesContainer>
        {recommendedMovies.map(recommendedMovie => {
          return (
              <MovieCard>
                <MoviePoster poster={`https://image.tmdb.org/t/p/original/${recommendedMovie.poster_path}`} />
                <TitleCard>{recommendedMovie.title} <FaPlay /></TitleCard>
              </MovieCard>
          );
        })}
      </RecommendedMoviesContainer>
    </div>
  )
}

const RecommendedMoviesContainer = styled.div`
  font-family: Arial, Helvetica, sans-serif;

  display: grid;
  grid-template-columns: repeat(auto-fit, 350px);
  gap: 1rem;
  justify-content: center;
  `

const MovieCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  
  height: 450px;  
  cursor: pointer;
`

const MoviePoster = styled.div`
  flex: 1;
  background-image: ${(props) => `url(${props.poster})`};
  background-size: cover;
  background-position: center;
  
  ${MovieCard}:hover & {
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
  
  ${MovieCard}:hover & {
    display: flex;
    flex-direction: column;
  }
`

export default Home;
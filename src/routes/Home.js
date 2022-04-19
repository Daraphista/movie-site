import { useEffect, useState } from "react";
import MovieAndTVCards from "../components/MovieAndTVCards";

const Home = (props) => {
  const { getMovieId } = props;

  const [recommendedMovies, setRecommendedMovies] = useState([]);
  
  const getRecommendedMovies = async () => {
    try {
      const result = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=394a500dc1b768ebe40e5c02328b32bf");
      const data = await result.json();
      setRecommendedMovies(data.results);
    } catch (error) {
      console.log("Error:", error);
    }
  }
  
  const [recommendedShows, setRecommendedShows] = useState([]);

  const getRecommendedShows = async () => {
    try {
      const result = await fetch("https://api.themoviedb.org/3/tv/popular?api_key=394a500dc1b768ebe40e5c02328b32bf&language=en-US&page=1");
      const data = await result.json();
      setRecommendedShows(data.results);
    } catch (error) {
      console.log("Error:", error);
    }
  }
 
  useEffect(() => {
    getRecommendedMovies();
    getRecommendedShows();
  }, [])

  return (
    <div>
      <MovieAndTVCards movies={recommendedMovies} shows={recommendedShows} getMovieId={getMovieId} />
    </div>
  )
}



export default Home;
import { useEffect, useState } from "react";
import MovieResults from "../components/MovieResults";

const Home = (props) => {
  const { getMovieId } = props;

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
      <MovieResults movies={recommendedMovies} getMovieId={getMovieId} />
    </div>
  )
}



export default Home;
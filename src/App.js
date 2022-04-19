import { useState, useEffect } from "react";
import styled from "styled-components";
import {  Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Search from "./routes/Search";
import Header from "./components/Header";
import Watch from "./routes/Watch";
import WatchShow from "./routes/WatchShow";


const App = () => {
  const [searchResultsMovies, setSearchResultsMovies] = useState([]);
  const [searchResultsShows, setSearchResultsShows] = useState([]);
  
  const liftSearchResultsMovies = (fetchedSearchResults) => {
    setSearchResultsMovies(fetchedSearchResults);
  }

  const liftSearchResultsShows = (fetchedSearchResults) => {
    setSearchResultsShows(fetchedSearchResults);
  }

  const [movieId, setMovieId] = useState(null);

  const getMovieId = (newMovieId) => {
    setMovieId(newMovieId);
  }

  return (
    <AppContainer>
      <Header 
        liftSearchResultsMovies={liftSearchResultsMovies} 
        liftSearchResultsShows={liftSearchResultsShows}
      />
      <Routes>
        <Route 
          path="movie-site" 
          element={<Home 
            liftSearchResults={liftSearchResultsMovies} 
            getMovieId={getMovieId}
            />} 
            />
        <Route 
          path="movie-site/search" 
          element={<Search 
            searchResultsMovies={searchResultsMovies}
            searchResultsShows={searchResultsShows}
            getMovieId={getMovieId}
            />} 
        />
        <Route 
          path="movie-site/watch"
          element={<Watch movieId={movieId} />}
        />
        <Route
          path="movie-site/watch-show"
          element={<WatchShow showID={movieId}/>}
        />
      </Routes>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  padding-bottom: 2rem;

  display: flex;
  flex-direction: column;
`

export default App;

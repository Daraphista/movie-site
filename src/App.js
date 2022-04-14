import { useState, useEffect } from "react";
import styled from "styled-components";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./routes/Home";
import Search from "./routes/Search";
import Header from "./components/Header";
import Watch from "./routes/Watch";


const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  
  const liftSearchResults = (fetchedSearchResults) => {
    setSearchResults(fetchedSearchResults);
  }

  const [movieId, setMovieId] = useState(null);

  const getMovieId = (newMovieId) => {
    setMovieId(newMovieId);
  }

  return (
    <AppContainer>
      <Header liftSearchResults={liftSearchResults} />
      <Routes>
        <Route 
          path="movie-site" 
          element={<Home 
            liftSearchResults={liftSearchResults} 
            getMovieId={getMovieId}
            />} 
            />
        <Route 
          path="movie-site/search" 
          element={<Search 
            liftSearchResults={liftSearchResults} 
            searchResults={searchResults}
            getMovieId={getMovieId}
            />} 
        />
        <Route 
          path="movie-site/watch"
          element={<Watch 
            movieId={movieId}
          />}
        />
      </Routes>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  min-height: 100vh;
  padding-bottom: 2rem;

  display: flex;
  flex-direction: column;
`

export default App;

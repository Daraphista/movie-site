import { useState, useEffect } from "react";
import styled from "styled-components";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./routes/Home";
import Search from "./routes/Search";
import Header from "./components/Header";


const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  
  const liftSearchResults = (fetchedSearchResults) => {
    setSearchResults(fetchedSearchResults);
  }

  return (
    <AppContainer>
      <Header liftSearchResults={liftSearchResults} />
      <Routes>
        <Route 
          path="/" 
          element={<Home liftSearchResults={liftSearchResults} />} 
        />
        <Route 
          path="/search" 
          element={<Search 
            liftSearchResults={liftSearchResults} 
            searchResults={searchResults}
          />} 
        />
      </Routes>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  min-height: 100vh;
  padding-bottom: 2rem;
`

export default App;

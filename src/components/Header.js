import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


const Header = (props) => {
  const { liftSearchResultsShows, liftSearchResultsMovies } = props;

  const [searchQuery, setSearchQuery] = useState([])
  
  const navigate = useNavigate();

  const getSearchResultsMovies = async (searchQuery) => {
    try {
      const result = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=394a500dc1b768ebe40e5c02328b32bf&language=en-US&query=${searchQuery}&page=1&include_adult=false`);
      const data = await result.json();
      liftSearchResultsMovies(data.results);
    } catch (error) {
      console.log(error);
    }
  }
  
  const getSearchResultsShows = async (searchQuery) => {
    try {
      const result = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=394a500dc1b768ebe40e5c02328b32bf&language=en-US&page=1&query=${searchQuery}&include_adult=false`)
      const data = await result.json();
      liftSearchResultsShows(data.results);
    } catch (error) {
      console.log(error);
    }
  }
  
  const location = useLocation();
  
  const [isInHome, setIsInHome] = useState(true);

  useEffect(() => {
    setIsInHome(location.pathname === "/movie-site");
  })

  return (
    <HeaderContainer>
      {isInHome
        ? null
        : <LinkButton to="/movie-site"><BsArrowLeft/>Home</LinkButton>
      }
      <SearchForm
        onSubmit={e => {
          e.preventDefault();
          navigate(`/movie-site/search`);
          getSearchResultsMovies(searchQuery);
          getSearchResultsShows(searchQuery);
        }}
      >
        <SearchBar htmlFor="search">
          <AiOutlineSearch />
          <SearchInput 
            id="search"
            placeholder="I want to watch..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            required
            autoComplete="off"
          />
        </SearchBar>
      </SearchForm>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;

  padding: 4rem;

  @media (max-width: 640px) {
    padding-inline: 15px;
  }
`

const SearchForm = styled.form`
  width: max(500px, 50%);

  @media (max-width: 640px) {
    width: min(300px, 90%);
  }
`

const SearchBar = styled.label`
  display: flex;
  font-size: 1.5rem;
  color: white;
  
  border-radius: 999px;

  padding: .75rem;
  gap: .5rem;

  background-color: #4e4e4e;
  cursor: text;

  @media (max-width: 640px) {
    font-size: 1.25rem;
  }
`

const SearchInput = styled.input`
  background-color: transparent;
  border: none;
  color: white;
  flex: 1;

  font-size: 1.25rem;

  &:focus {
    outline: none;
  }

  @media (max-width: 640px) {
    font-size: 1rem;
  }
`

const LinkButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: .75rem;

  border-radius: 999px;

  margin-right: auto;
  border: none;
  font-size: 1.5rem;
  color: white;

  cursor: pointer;

  text-decoration: none;
  font-family: Arial, Helvetica, sans-serif;

  &:hover {
    background-color: #4e4e4e;
  }

  @media (max-width: 640px) {
    font-size: 1rem;
    gap: .5rem;

    position: absolute;
    top: 5px;
    left: 5px
  }
`

export default Header;
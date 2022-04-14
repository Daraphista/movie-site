import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = (props) => {
  const { liftSearchResults } = props;

  const [searchQuery, setSearchQuery] = useState([])
  
  const navigate = useNavigate();

  const getSearchResults = async (searchQuery) => {
    navigate(`/search`);
    try {
      const result = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=394a500dc1b768ebe40e5c02328b32bf&language=en-US&query=${searchQuery}&page=1&include_adult=false`);
      const data = await result.json();
      liftSearchResults(data.results);
      console.log(data.results);
    } catch (error) {
      console.log(error);
    }
  }
  
  const location = useLocation();
  
  const [isInHome, setIsInHome] = useState(true);

  useEffect(() => {
    setIsInHome(location.pathname === "/");
  })

  return (
    <HeaderContainer>
      {isInHome
        ? null
        : <LinkButton to="/"><BsArrowLeft/>Back to Home</LinkButton>
      }
      <SearchForm
        onSubmit={e => {
          e.preventDefault();
          getSearchResults(searchQuery);
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
`

const SearchForm = styled.form`
  width: max(500px, 50%);
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
`

const LinkButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-inline: 1rem;

  border-radius: 999px;

  margin-right: auto;
  background-color: #4e4e4e;
  border: none;
  font-size: 1.5rem;
  color: white;

  cursor: pointer;

  text-decoration: none;
  font-family: Arial, Helvetica, sans-serif;

  &:hover {
    background-color: gray;
  }
`

export default Header;
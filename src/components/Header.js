import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai"

const Header = () => {
  return (
    <HeaderContainer>
        <SearchBar htmlFor="search">
          <AiOutlineSearch />
          <SearchInput 
            id="search"
            placeholder="I want to watch..."
          />
        </SearchBar>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;

  padding: 4rem;
`

const SearchBar = styled.label`
  display: flex;
  font-size: 1.5rem;
  color: white;

  width: 50%;
  border-radius: 999px;

  padding: .75rem;
  gap: .5rem;

  background-color: #4e4e4e;
`

const SearchInput = styled.input`
  background-color: transparent;
  border: none;
  color: white;

  font-size: 1.25rem;

  &:focus {
    outline: none;
  }
`

export default Header;
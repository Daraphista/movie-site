import styled from "styled-components";

const Watch = (props) => {

  return (
    <PlayerContainer>
      <EmbeddedPlayer
        src={`https://www.2embed.ru/embed/tmdb/movie?id=${props.movieId}`} 
        allowFullScreen
      />
    </PlayerContainer>
  )
}

const PlayerContainer = styled.div`
  flex: 1;

  display: flex;
  justify-content: center;
`

const EmbeddedPlayer = styled.iframe`
  width: 95vw;
  height: 50vw;

  border: none;
`

export default Watch;
import styled from "styled-components";

const Watch = (props) => {

  return (
    <PlayerContainer>
      {/* {props.movieId} */}
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
  padding: 4rem;
`

const EmbeddedPlayer = styled.iframe`
  width: 80vw;
  height: 40vw;
`

export default Watch;
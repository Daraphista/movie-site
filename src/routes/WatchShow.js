import { useEffect, useState } from "react";
import styled from "styled-components";

const WatchShow = (props) => {
  const { showID } = props

  const [showData, setShowData] = useState({})

  const getShowData = async () => {
    try {
      const result = await fetch(`https://api.themoviedb.org/3/tv/${showID}?api_key=394a500dc1b768ebe40e5c02328b32bf&language=en-US`)
      const data = await result.json();
      setShowData(data);

      const seasonsData = await getSeasonsData(data.seasons);
      setSeasons(seasonsData);
    } catch (error) {
      console.log("Error:", error);
    }
  }

  const getSeasonsData = async (seasons) => {
    const results = await Promise.all(
      seasons.map( async (season) => {
        try {
          const result = await fetch(`https://api.themoviedb.org/3/tv/${showID}/season/${season.season_number}?api_key=394a500dc1b768ebe40e5c02328b32bf&language=en-US`);
          const data = await result.json();
          return data;
        } catch (error) {
          console.log("Error:", error);
        }
      })
    );
    return results;
  }

  const [seasons, setSeasons] = useState([])
  const [episodes, setEpisodes] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState({});
  const [selectedEpisode, setSelectedEpisode] = useState({episode_number: 1});

  useEffect(() => {
    getShowData();
  }, [])
  
  useEffect(() => {
    console.log("seasons state changed")
    setSelectedSeason(seasons[0])
  }, [seasons])

  useEffect(() => {
    console.log(selectedSeason);
    if (typeof selectedSeason === "object" && selectedSeason.episodes !== undefined) {
      setEpisodes(selectedSeason.episodes);
    }
  }, [selectedSeason])

  useEffect(() => {
    if(typeof episodes[0] !== "undefined") {
      console.log("set selected episode", episodes)
      setSelectedEpisode(episodes[0]);
    }
  }, [episodes])

  useEffect(() => {
    console.log(selectedEpisode);
  })

  return (
    <MainContainer>
      <PlayerContainer>
        {(() => {
          if(typeof selectedSeason === "object") {
            return (
              <EmbeddedPlayer
                src={`https://www.2embed.ru/embed/tmdb/tv?id=${showID}&s=${selectedSeason.season_number}&e=${selectedEpisode.episode_number}`}
                allowFullScreen
              />
            )
          }
        })()}
      </PlayerContainer>
      <SeasonsContainer>
        <SeasonCardSelector 
          onChange={e => {
            const selectedSeasonNumber = e.target.value;
            setSelectedSeason(seasons[selectedSeasonNumber]);
          }}
        >
          {seasons.map(season => {
            return (
              <SeasonCardSelectorOption value={seasons.indexOf(season)}>
                {season.name}
              </SeasonCardSelectorOption>
            )
          })}
        </SeasonCardSelector>
        <EpisodesContainer>
          {episodes.map(episode => {
            return (
              <EpisodeCard 
                onClick={() => {
                  setSelectedEpisode(episode);
                }}
                className={`${(episode === selectedEpisode) ? "selected" : ""}`}
              >
                {episode.episode_number}: {episode.name}
              </EpisodeCard>
            )
          })}
        </EpisodesContainer>
      </SeasonsContainer>
    </MainContainer>
  )
}

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;

  align-items: center;
`

const PlayerContainer = styled.div`
  flex: 1;

  display: flex;
  justify-content: center;
`

const EmbeddedPlayer = styled.iframe`
  width: 95vw;
  height: 50vw;

  background-color: wheat;

  border: none;
`

const SeasonsContainer = styled.div`
  display: flex;
  flex-direction: column;

  padding: 3rem;
  gap: 20px;

  width: 60%;
`

const SeasonCardSelector = styled.select`
  appearance: none;
  border: none;
  outline: none;
  padding: .5rem;
  border-radius: 10px;

  color: white;
  background-color: transparent;
  box-shadow: 0px 0px 5px black;

  font-size: 1.5rem;
  width: 100%;

  cursor: pointer;
`

const SeasonCardSelectorOption = styled.option`
  color: black;
`

const EpisodesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, max(200px, 15%));
  justify-content: center;

  gap: 10px;
`

const EpisodeCard = styled.div`
  font-family: Arial, Helvetica, sans-serif;

  padding: .5rem;
  border-radius: 10px;
  box-shadow: 0px 0px 5px black;

  color: white;

  cursor: pointer;

  &:hover {
    background-color: #393939;
  }

  &.selected {
    background-color: #0b0b0b;
  }
`

export default WatchShow;
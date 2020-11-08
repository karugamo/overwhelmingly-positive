import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import allGames from '../../data/games.json'
import Head from '../components/Head'
import GameModal from '../components/GameModal'
import GameThumbnail from '../components/GameThumbnail'
import {Game} from '../types'
import Tag from '../components/Tag'
import '../styles/main.css'
import {genres} from '../const'
import {intersection} from 'lodash'

const Tags = styled.section`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;

  @media (max-width: 1450px) {
    display: none;
  }
`

export default function App() {
  const [currentGame, setCurrentGame] = useState<Game>()
  const [games, setGames] = useState<Game[]>(allGames)

  const [filterGenres, setFilterGenres] = useState<number[]>([])

  useFilterGamesByGenres()
  useGetGameFromUrl()

  return (
    <Main>
      <Head />
      <Headline>overwhelmingly positive on steam</Headline>
      <Filter onToggle={onToggleFilter} activeGenreIds={filterGenres} />
      <Games>
        {games.length === 0 && <Headline>No games match your filters</Headline>}
        {games.map((game) => (
          <GameThumbnail
            key={game.appId}
            game={game}
            onOpenGame={handleThumbnailClick}
          />
        ))}
      </Games>
      {currentGame && (
        <GameModal game={currentGame} onClose={handleModalClose} />
      )}
      <About />
    </Main>
  )

  function useFilterGamesByGenres() {
    useEffect(() => {
      setGames(
        allGames.filter(
          (game) =>
            intersection(game.genres, filterGenres).length ===
            filterGenres.length
        )
      )
    }, [filterGenres])
  }

  function useGetGameFromUrl() {
    useEffect(() => {
      const name = window?.location?.hash?.split('#')?.[1]
      const game = allGames?.find(
        (game) => decodeURIComponent(name) === game.name
      )

      if (game) setCurrentGame(game)
    }, [])
  }

  function handleThumbnailClick(game) {
    setCurrentGame(game)
    window.location.hash = encodeURIComponent(game.name)
  }

  function handleModalClose() {
    setCurrentGame(undefined)
    removeHash()

    function removeHash() {
      history.pushState(
        '',
        document.title,
        window.location.pathname + window.location.search
      )
    }
  }

  function onToggleFilter(genreId: number) {
    setFilterGenres(
      filterGenres.includes(genreId)
        ? filterGenres.filter((id) => id !== genreId)
        : [...filterGenres, genreId]
    )
  }
}

function About() {
  return <AboutLink href="http://karugamo.agency/">🦆</AboutLink>
}

type FilterProps = {
  onToggle: (genreId: number) => void
  activeGenreIds: number[]
}

function Filter({onToggle, activeGenreIds}: FilterProps) {
  return (
    <Tags>
      {Object.entries(genres).map(([id, name]) => (
        <Tag
          inverted={activeGenreIds.includes(Number(id))}
          key={id}
          onClick={() => onToggle(Number(id))}
        >
          {name}
        </Tag>
      ))}
    </Tags>
  )
}

const AboutLink = styled.a`
  font-size: 50px;
  text-decoration: none;
  margin: 50px;
`

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Headline = styled.h1`
  color: #dcdcdc;
  font-size: 30px;
  font-weight: 600;
  text-align: center;
  margin: 10px;
`

const Games = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`

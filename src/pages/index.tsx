import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import allGames from '../../data/games.json'
import Head from '../components/Head'
import GameModal from '../components/GameModal'
import GameThumbnail from '../components/GameThumbnail'
import {Game, Genre} from '../types'
import Tag from '../components/Tag'
import '../styles/main.css'
import {genreNames} from '../const'

export default function App() {
  const [currentGame, setCurrentGame] = useState<Game>()
  const [games, setGames] = useState<Game[]>(allGames)
  const [activeFilters, setActiveFilters] = useState<Filter[]>([])

  useFilterGames()
  useGetGameFromUrl()

  return (
    <Main>
      <Head />
      <Headline>overwhelmingly positive on steam</Headline>
      <FilterTags onToggle={onToggleFilter} activeFilters={activeFilters} />
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

  function useFilterGames() {
    useEffect(() => {
      const filteredGames = activeFilters.reduce(
        (acc, filter) => acc.filter(filter.function),
        allGames
      )

      setGames(filteredGames)
    }, [activeFilters])
  }

  function useGetGameFromUrl() {
    useEffect(() => {
      getGameFromHash()
      window.addEventListener('hashchange', getGameFromHash)

      return () => window.removeEventListener('hashchange', getGameFromHash)
    }, [])
  }

  function getGameFromHash() {
    const name = window?.location?.hash?.split('#')?.[1]
    const game = allGames?.find(
      (game) => decodeURIComponent(name).replace(/_/g, ' ') === game.name
    )

    if (game) setCurrentGame(game)
  }

  function handleThumbnailClick(game) {
    setCurrentGame(game)
    window.location.hash = encodeURIComponent(game.name.replace(/ /g, '_'))
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

  function onToggleFilter(filter: Filter) {
    const isActive = activeFilters.map(({name}) => name).includes(filter.name)

    setActiveFilters(
      isActive
        ? activeFilters.filter(({name}) => name !== filter.name)
        : [...activeFilters, filter]
    )
  }
}

function About() {
  return <AboutLink href="http://karugamo.agency/">🦆</AboutLink>
}

type FilterTagsProps = {
  onToggle: (filter: Filter) => void
  activeFilters: Filter[]
}

function FilterTags({onToggle, activeFilters}: FilterTagsProps) {
  const filterTagProps = {
    onToggle,
    activeFilters
  }

  return (
    <StyledFilter>
      {Object.keys(genreNames).map((genre) => (
        <FilterTag
          key={genre}
          {...filterTagProps}
          filter={createGenreFilter(Number(genre))}
        />
      ))}
    </StyledFilter>
  )
}

function createGenreFilter(genre: Genre) {
  return {
    name: genreNames[genre],
    function: (game: Game) => game?.genres?.includes(genre)
  }
}

type FilterTagProps = {
  filter: Filter
  onToggle: (filter: Filter) => void
  activeFilters: Filter[]
}

function FilterTag({filter, activeFilters, onToggle}: FilterTagProps) {
  const isActive = activeFilters
    .map((filter) => filter.name)
    .includes(filter.name)

  return (
    <Tag inverted={isActive} onClick={() => onToggle(filter)}>
      {filter.name}
    </Tag>
  )
}

const StyledFilter = styled.section`
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;

  @media (max-width: 1450px) {
    display: none;
  }
`

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

type Filter = {
  name: string
  function: (game: Game) => boolean
}

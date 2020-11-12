import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import allGames from '../../data/games.json'
import Head from '../components/Head'
import GameModal from '../components/GameModal'
import GameThumbnail from '../components/GameThumbnail'
import {Category, Game, Genre} from '../types'
import Tag from '../components/Tag'
import '../styles/main.css'
import {categories, genreNames} from '../const'
import {encodeGame} from '../lib/encode'

type AppProps = {
  pageContext: {
    game?: Game
  }
}

export default function App({pageContext: {game}}: AppProps) {
  const [currentGame, setCurrentGame] = useState<Game>(game)
  const [games, setGames] = useState<Game[]>(allGames)
  const [activeFilters, setActiveFilters] = useState<Filter[]>([])

  useFilterGames()

  return (
    <Main>
      <Head title={getTitle(currentGame)} />
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

  function handleThumbnailClick(game) {
    setCurrentGame(game)
    const encodedName = encodeGame(game)
    window.history.pushState({}, getTitle(game), `/game/${encodedName}`)
  }

  function handleModalClose() {
    setCurrentGame(undefined)
    window.history.pushState({}, getTitle(), '/')
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
    <FilterTagsContainer>
      {Object.keys(genreNames).map((genre) => (
        <FilterTag
          key={genre}
          {...filterTagProps}
          filter={createGenreFilter(Number(genre))}
        />
      ))}
      {Object.keys(categories).map((category) => (
        <FilterTag
          key={category}
          {...filterTagProps}
          filter={createCategoryFilter(Number(category))}
        />
      ))}
    </FilterTagsContainer>
  )
}

const FilterTagsContainer = styled.section`
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 1100px;

  @media (max-width: 1200px) {
    display: none;
  }
`

function createGenreFilter(genre: Genre) {
  return {
    name: genreNames[genre],
    function: (game: Game) => game?.genres?.includes(genre)
  }
}

function createCategoryFilter(category: Category) {
  return {
    name: categories[category],
    function: (game: Game) => game?.categories?.includes(category)
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
    <StyledTag inverted={isActive} onClick={() => onToggle(filter)}>
      {filter.name}
    </StyledTag>
  )
}

const StyledTag = styled(Tag)`
  margin-bottom: 7px;
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

function getTitle(game?: Game) {
  const mainTitle = 'Overwhelmingly Positive Rated Games on Steam'

  if (!game) return mainTitle

  return `${game.name} | ${mainTitle}`
}

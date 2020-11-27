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
import CookieBanner from 'react-cookie-banner'
import Logo from '../components/Logo'
import {shuffle} from 'lodash'

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
      <CookieBanner message="We use cookies too analyse the traffic of our website. By continuing to browse the site you're agreeing to our use of cookies." />
      <Logo />
      <OptionsBar>
        <FilterTags onToggle={onToggleFilter} activeFilters={activeFilters} />
        <Button onClick={shuffleGames}>Shuffle</Button>
      </OptionsBar>
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

  function shuffleGames() {
    setGames((games) => shuffle(games))
  }

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
  justify-content: flex-start;
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
  color: transparent;
  text-shadow: 0 0 0 #a0d6f6;
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

const Button = styled.button`
  font-size: 20px;
  padding: 12px 40px;
  margin: 20px;
  border: 2px solid #9dd5f6;
  background-color: transparent;
  color: #9dd5f6;
  margin: 0;
  cursor: pointer;
  border-radius: 7px;
  box-shadow: 0px 2px white;

  transition: background-color 0.2s, color 0.2s;

  :hover {
    background-color: #9dd5f6;
    color: black;
  }

  :active {
    transform: translate(0, 2px);
    box-shadow: 0px 0px white;
  }
`

const OptionsBar = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 1380px;
  width: 100%;

  @media (max-width: 1200px) {
    justify-content: center;
    margin-bottom: 10px;
  }
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

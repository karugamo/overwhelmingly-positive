import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import allGames from '../../data/games.json'
import Head from '../components/Head'
import GameModal from '../components/GameModal'
import GameThumbnail from '../components/GameThumbnail'
import {Game} from '../types'
import {encodeGame} from '../lib/encode'
import CookieBanner from 'react-cookie-banner'
import Logo from '../components/Logo'
import {shuffle} from 'lodash'
import FilterTags, {Filter} from '../components/FilterTags'
import '../styles/main.css'

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

function getTitle(game?: Game) {
  const mainTitle = 'Overwhelmingly Positive Rated Games on Steam'

  if (!game) return mainTitle

  return `${game.name} | ${mainTitle}`
}

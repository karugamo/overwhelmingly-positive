import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import '../styles/main.css'
import allGames from '../../data/games.json'
import Head from '../components/Head'
import GameModal from '../components/GameModal'
import {Game} from '../types'
import {encodeGame} from '../lib/encode'
import CookieBanner from 'react-cookie-banner'
import Logo from '../components/Logo'
import {shuffle} from 'lodash'
import FilterTags, {Filter} from '../components/FilterTags'
import GameList from '../components/GameList'
import Button from '../components/Button'
import About from '../components/About'

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
      <GameList games={games} onSelectGame={handleThumbnailClick} />
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

  function handleThumbnailClick(game: Game) {
    setCurrentGame(game)
    const encodedName = encodeGame(game)
    window.history.pushState({}, getTitle(game), `/game/${encodedName}`)
  }

  function handleModalClose() {
    setCurrentGame(null)
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

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const OptionsBar = styled.section<{test: boolean}>`
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

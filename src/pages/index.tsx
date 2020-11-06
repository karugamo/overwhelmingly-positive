import React, {useState} from 'react'
import styled from 'styled-components'
import games from '../../games.json'
import Head from '../components/Head'
import GameModal from '../components/GameModal'
import GameThumbnail from '../components/GameThumbnail'

import '../styles/main.css'

export default function App() {
  const [openGame, setOpenGame] = useState<string>()

  return (
    <Main>
      <Head />
      <Headline>overwhelmingly positive on steam</Headline>
      <Games>
        {games.map((game) => (
          <GameThumbnail
            key={game.appId}
            game={game}
            onOpenGame={setOpenGame}
          />
        ))}
      </Games>
      {openGame && (
        <GameModal game={openGame} onClose={() => setOpenGame(undefined)} />
      )}
      <About />
    </Main>
  )
}

function About() {
  return <AboutLink href="http://karugamo.agency/">🦆</AboutLink>
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

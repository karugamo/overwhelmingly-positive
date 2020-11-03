import React from 'react'
import styled from 'styled-components'
import games from '../games.json'
import {shuffle} from 'lodash'

export default function App() {
  return (
    <Main>
      <Headline>overwhelmingly positive on steam</Headline>
      <Games>
        {shuffle(games).map((game) => (
          <Game key={game.appId} {...game} />
        ))}
      </Games>
    </Main>
  )
}

function Game({appId}) {
  return (
    <GameContainer>
      <GameLink
        href={`https://store.steampowered.com/app/${appId}`}
        target="_blank"
      >
        <img
          src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/header.jpg`}
        />
      </GameLink>
    </GameContainer>
  )
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Headline = styled.h1`
  color: #dcdcdc;
  font-size: 30px;
  font-weight: 600;
`

const GameLink = styled.a``

const GameContainer = styled.div``

const Games = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`

import React from 'react'
import styled from 'styled-components'
import games from '../games.json'

export default function App() {
  return (
    <Main>
      {games.map((game) => (
        <Game key={game.appId} {...game} />
      ))}
    </Main>
  )
}

function Game({appId, positive, negative, name}) {
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
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  background-color: #202124;
  color: #242422;
  font-size: 30px;
`

const GameLink = styled.a``

const GameContainer = styled.div``

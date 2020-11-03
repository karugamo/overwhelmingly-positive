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
        {name}
      </GameLink>
    </GameContainer>
  )
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: #eeeee4;
  color: #242422;
  font-size: 30px;
`

const GameLink = styled.a``

const GameContainer = styled.div``

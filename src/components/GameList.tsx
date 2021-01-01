import React from 'react'
import styled from 'styled-components'
import {Game} from '../types'
import Amazon from './Amazon'
import GameThumbnail from './GameThumbnail'

type GameListProps = {
  games: Game[]
  onSelectGame: (game: Game) => void
}

export default function GameList({games, onSelectGame}: GameListProps) {
  return (
    <Container>
      {games.length === 0 && <Sorry>No games match your filters</Sorry>}
      <Amazon />
      {games.map((game) => (
        <GameThumbnail key={game.appId} game={game} onOpenGame={onSelectGame} />
      ))}
    </Container>
  )
}

const Container = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`

const Sorry = styled.h1`
  color: #dcdcdc;
  font-size: 30px;
  font-weight: 600;
  text-align: center;
  margin: 10px;
`

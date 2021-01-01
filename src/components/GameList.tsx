import React from 'react'
import styled from 'styled-components'
import {Game} from '../types'
import Amazon from './Amazon'
import GameThumbnail from './GameThumbnail'

type GameListProps = {
  games: Game[]
  onSelectGame: (game: Game) => void
}

const adPosition = 10

export default function GameList({games, onSelectGame}: GameListProps) {
  const gamesBeforeAd = games.slice(0, adPosition - 1)
  const gamesAfterAd = games.slice(adPosition - 1)
  return (
    <Container>
      {games.length === 0 && <Sorry>No games match your filters</Sorry>}
      {gamesBeforeAd.map((game) => (
        <GameThumbnail key={game.appId} game={game} onOpenGame={onSelectGame} />
      ))}
      {games.length >= adPosition && <Amazon />}
      {gamesAfterAd.map((game) => (
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

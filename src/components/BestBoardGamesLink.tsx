import React from 'react'
import styled from 'styled-components'

export default function BestBoardGamesLink() {
  return (
    <Container>
      <Dice />
      <Link target="_blank" href="https://best-board.games">
        board games
      </Link>
      <Dice />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
`

const Link = styled.a`
  color: #ddd;
  font-size: 40px;

  :hover {
    color: white;
  }

  :active {
    color: #ccc;
  }
`

function Dice() {
  return <DiceContainer>🎲</DiceContainer>
}

const DiceContainer = styled.div`
  margin: 16px;
  line-height: 26px;
  font-size: 40px;
`

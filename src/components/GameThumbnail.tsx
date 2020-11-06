import React from 'react'
import styled from 'styled-components'

export default function GameThumbnail({game, onOpenGame}) {
  return (
    <GameContainer onClick={() => onOpenGame(game)}>
      <Image
        width="460"
        height="215"
        alt={game.name}
        src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appId}/header.jpg`}
      />
    </GameContainer>
  )
}

const Image = styled.img`
  @media (max-width: 460px) {
    display: block;
    width: 100%;
    height: auto;
  }
`

const GameContainer = styled.div`
  cursor: pointer;

  @media (min-width: 460px) {
    height: 215px;

    transition: transform 0.1s ease-in-out;

    :hover {
      transform: scale(1.1);
    }
  }
`

import React, {useState} from 'react'
import styled from 'styled-components'
import {Game} from '../types'

const categories = {
  '1': 'Multi-player',
  '2': 'Single-player',
  '9': 'Co-op',
  '31': 'VR Support'
}

const genres = {
  '1': 'Action',
  '2': 'Strategy',
  '3': 'RPG',
  '4': 'Casual',
  '9': 'Racing',
  '18': 'Sports',
  '23': 'Indie',
  '25': 'Adventure',
  '28': 'Simulation',
  '29': 'Massively Multiplayer',
  '37': 'Free to Play',
  '70': 'Early Access',
  '71': 'Sexual Content',
  '72': 'Nudity'
}

type GameThumbnailProps = {
  game: Game
  onOpenGame: (game: Game) => void
}

export default function GameThumbnail({game, onOpenGame}: GameThumbnailProps) {
  const [hoveredOver, setHoveredOver] = useState(false)

  return (
    <GameContainer
      onClick={() => onOpenGame(game)}
      onMouseEnter={() => setHoveredOver(true)}
      onMouseLeave={() => setHoveredOver(false)}
    >
      <Image
        loading="lazy"
        width="460"
        height="215"
        alt={game.name}
        src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appId}/header.jpg`}
      />
      <Categories showTags={hoveredOver}>
        {game.categories.map((id) => (
          <Tag key={id}>{categories[id]}</Tag>
        ))}
      </Categories>
      <Genres showTags={hoveredOver}>
        {(game.genres || []).map((id) => (
          <Tag inverted key={id}>
            {genres[id]}
          </Tag>
        ))}
      </Genres>
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

type TagsProps = {
  showTags?: boolean
}

const Tags = styled.div<TagsProps>`
  justify-content: center;
  align-items: center;
  position: absolute;
  display: ${({showTags}) => (showTags ? 'flex' : 'none')};
`

const Genres = styled(Tags)`
  right: 8px;
  bottom: 8px;
`

const Categories = styled(Tags)`
  left: 8px;
  top: 8px;
`

type TagProps = {
  inverted?: boolean
}

const Tag = styled.div<TagProps>`
  border-radius: 25px;
  text-align: center;
  padding: 4px 10px;
  margin-left: 4px;
  background: ${({inverted}) => (inverted ? '#ddd' : '#444')};
  border: 2px solid ${({inverted}) => (inverted ? '#ccc' : '#333')};
  color: ${({inverted}) => (inverted ? '#333' : '#ddd')};
  font-weight: 500;
`

const GameContainer = styled.div`
  cursor: pointer;
  position: relative;

  @media (min-width: 460px) {
    height: 215px;

    transition: transform 0.1s ease-in-out;

    :hover {
      transform: scale(1.1);
      z-index: 10;
    }
  }
`

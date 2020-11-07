import React, {useState} from 'react'
import {intersectionBy} from 'lodash'
import styled from 'styled-components'

const relevantCategories = [
  {id: 2, description: 'Single-player'},
  {id: 1, description: 'Multi-player'},
  {id: 9, description: 'Co-op'},
  {
    id: 31,
    description: 'VR Support'
  }
]

export default function GameThumbnail({game, onOpenGame}) {
  const [hoveredOver, setHoveredOver] = useState(false)

  const categories = intersectionBy(
    relevantCategories,
    game.categories,
    ({id}) => id
  )

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
        {categories.map(({description}) => (
          <Tag key={description}>{description}</Tag>
        ))}
      </Categories>
      <Genres showTags={hoveredOver}>
        {(game.genres || []).map(({description}) => (
          <Tag inverted key={description}>
            {description}
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

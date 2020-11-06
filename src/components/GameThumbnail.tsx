import React, {useState} from 'react'
import {intersectionBy} from 'lodash'
import styled from 'styled-components'

const relevantCategories = [
  {id: 2, description: 'Single-player'},
  {id: 1, description: 'Multi-player'},
  {id: 9, description: 'Co-op'}
]

export default function GameThumbnail({game, onOpenGame}) {
  const [showTags, setShowTags] = useState(false)

  const categories = intersectionBy(
    relevantCategories,
    game.categories,
    ({id}) => id
  )

  return (
    <GameContainer
      onClick={() => onOpenGame(game)}
      onMouseEnter={() => setShowTags(true)}
      onMouseLeave={() => setShowTags(false)}
    >
      <Image
        width="460"
        height="215"
        alt={game.name}
        src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appId}/header.jpg`}
      />
      <Categories showTags={showTags}>
        {categories.map(({description}) => (
          <Tag key={description}>{description}</Tag>
        ))}
      </Categories>
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

type CategoriesProps = {
  showTags?: boolean
}

const Categories = styled.div<CategoriesProps>`
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 8px;
  bottom: 8px;
  display: ${({showTags}) => (showTags ? 'flex' : 'none')};
`

const Tag = styled.div`
  border-radius: 25px;
  text-align: center;
  padding: 4px 10px;
  margin-left: 4px;
  background: #444;
  border: 2px solid #333;
  color: #ddd;
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

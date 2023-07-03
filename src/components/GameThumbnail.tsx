import React, { useState } from "react";
import styled from "styled-components";
import { categories, genreNames } from "../const";
import { encodeGame } from "../lib/encode";
import { Game } from "../types";
import Tag from "./Tag";

type GameThumbnailProps = {
  game: Game;
  onOpenGame: (game: Game) => void;
};

export default function GameThumbnail({
  game,
  onOpenGame,
}: GameThumbnailProps) {
  const [hoveredOver, setHoveredOver] = useState(false);

  return (
    <GameContainer
      href={`/game/${encodeGame(game)}`}
      onClick={(e) => {
        e.preventDefault();
        onOpenGame(game);
        return false;
      }}
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
          <Tag key={id}>{genreNames[id]}</Tag>
        ))}
      </Genres>
    </GameContainer>
  );
}

const Image = styled.img`
  @media (max-width: 460px) {
    display: block;
    width: 100%;
    height: auto;
  }
`;

type TagsProps = {
  showTags?: boolean;
};

const Tags = styled.div<TagsProps>`
  justify-content: center;
  align-items: center;
  position: absolute;
  display: ${({ showTags }) => (showTags ? "flex" : "none")};
`;

const Genres = styled(Tags)`
  right: 8px;
  bottom: 8px;
`;

const Categories = styled(Tags)`
  left: 8px;
  top: 8px;
`;

const GameContainer = styled.a`
  cursor: pointer;
  display: block;
  position: relative;

  @media (min-width: 460px) {
    height: 215px;

    transition: transform 0.1s ease-in-out;

    &:hover {
      transform: scale(1.1);
      z-index: 2;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
    }
  }
`;

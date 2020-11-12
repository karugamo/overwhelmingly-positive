import {Game} from '../types'

// this is duplicated in gatsby-node.js
export function encodeGame(game: Game) {
  return game.name
    .replace(/[^\w\s]/gi, '')
    .trim()
    .replace(/ /g, '_')
}

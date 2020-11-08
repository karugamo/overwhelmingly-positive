export type Game = {
  name: string
  appId: string
  video: string
  categories: Category[]
  genres: Genre[]
}

export enum Genre {
  Action = 1,
  Strategy = 2,
  Rpg = 3,
  Casual = 4,
  Racing = 9,
  Sports = 18,
  Indie = 23,
  Adventure = 25,
  Simulation = 28,
  MassivelyMultiplayer = 29,
  FreeToPlay = 37,
  EarlyAccess = 70,
  SexualContent = 71,
  Nudity = 72
}

export enum Category {
  MultiPlayer = 1,
  SinglePlayer = 2,
  CoOp = 9,
  VrSupport = 31
}

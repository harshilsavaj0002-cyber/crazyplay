export interface Game {
  code: string
  url: string
  name: {
    en: string
  }
  description: {
    en: string
  }
  gamePreviews?: {
    en: string
  }
  assets: {
    cover: string
    coverTiny: string
    thumb: string
    brick: string
    brickTiny: string
    wall: string
    square: string
    screens: string[]
  }
  categories: {
    en: string[]
  }
  tags: {
    en: string[]
  }
  rating: number
  numberOfRatings: number
  gamePlays: number
  isPortrait: boolean
  width: number
  height: number
  colorMuted: string
  colorVibrant: string
  hasIntegratedAds?: boolean
  privateAllowed?: boolean
}

export interface GamesResponse {
  games: Game[]
}

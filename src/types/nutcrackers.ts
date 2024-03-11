export interface Nutcrackers {
  maxRarity: null | NutcrackerRarity
  nutcrackers: Nutcracker[]
  pointsCacheBack: number
}

export interface Nutcracker {
  name: string
  imageLink: string
  getGemsLink: string
  attributes: NutcrackerAttributes
  index: number
  contract: string
  owner: string
  rarity: NutcrackerRarity
}

export interface NutcrackerAttributes {
  Rarity: NutcrackerRarity
  Background: string
  Body: string
  Eyes: string
  Hat: string
  Mouth: string
}

export type NutcrackerRarity =
  | "common"
  | "uncommon"
  | "rare"
  | "epic"
  | "mythical"
  | "legendary"

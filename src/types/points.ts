export interface PointsPrize {
  id: number
  price: number
  currency: "union_points"
  title: string
  description: string
  totalCount: number
  link: string
  rarity: string
  backgroundColor: string
  image: string
  type: "nft" | "crypton_promo_code"
  photos: [
    {
      id: number
      file: string
      orderNumber: number
    }
  ]
}

export interface PointsBuyPrizeResponse {
  instruction: string
  prizeCode: string
  helpText: string
  claimUrl: string
}

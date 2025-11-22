export interface Inventory {
  items: InventoryItem[]
  itemsCount: number
}

export interface InventoryItem {
  id: number
  prizeId: number
  title: string | null
  description: string | null
  type: "nft" | "crypton_promo_code" | "sponsor_promo_code" | null
  kind: "clothes" | "subscription" | "wallet" | "accessories" | null
  rarity: string | null
  backgroundColor: string | null
  image: string | null
  photos: Array<{ id: number; file: string; orderNumber: number }>
  userData: string | null
  instruction: string | null
  isClaimed: boolean
  isUsed: boolean
  claimedAt: string | null
  usedAt: string | null
  unionBalancePrice: number | null
  isSold: boolean
  receivedAt: string
}

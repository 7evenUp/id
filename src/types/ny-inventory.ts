export interface Inventory {
  items: InventoryItem[]
  items_count: number
}

export interface InventoryItem {
  id: number
  prize_id: number
  title: string | null
  description: string | null
  type: "nft" | "crypton_promo_code" | "sponsor_promo_code" | null
  rarity: string | null
  background_color: string | null
  image: string | null
  photos: Array<{ id: number; file: string; orderNumber: number }>
  claim_link: string
  is_claimed: boolean
  is_used: boolean
  claimed_at: string | null
  used_at: string | null
  received_at: string
}

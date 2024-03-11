export interface NFTItems {
  nft_items: NFTItem[]
}

export interface NFTItem {
  address: string
  index: number
  owner: AccountAddress
  collection: {
    address: string
    name: string
    description: string
  }
  verified: boolean
  metadata: NutcrackerMetadata
  sale: Sale
  previews: ImagePreview[]
  dns: string
  approved_by: Array<"getgems" | "tonkeeper" | "ton.diamonds">
}

export interface NutcrackerMetadata {
  name: "Nutcracker"
  image: string
  attributes: Array<{
    trait_type: string
    value: string
  }>
  description: string
  marketplace: string
}

export interface AccountAddress {
  address: string
  is_scam: boolean
  is_wallet: boolean
}

export interface Sale {
  address: string
  market: AccountAddress
  owner: AccountAddress
  price: Price
}

export interface Price {
  value: string
  token_name: string
}

export interface ImagePreview {
  resolution: "5x5" | "100x100" | "500x500" | "1500x1500"
  url: string
}

export interface PaymentsMethod {
  createdDatetime: string
  currency: Currency
  id: number
  isActive: boolean
  isDefault: boolean
  method: Method
  network: Network | null
}

export interface Currency {
  id: string
  label: string
}

export interface Method {
  id: "crypto" | "card"
  label: string
}

export interface Network {
  id: string
  label: string
}

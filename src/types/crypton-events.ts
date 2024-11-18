export interface ContainersResponse {
  containers: Container[]
  totalCount: number
}

export interface Container {
  id: number
  image: string
  isVisible: true
  name: string
  order: number
  price: number
  prizes: ContainerPrize[]
}

export interface ContainerPrize {
  numberInContainer: number
  prize: Prize
}

export interface Prize {
  backgroundColor: string
  description: string
  id: number
  image: string
  link: string
  rarity: string
  title: string
  totalCountForUser: number
  photos: [
    {
      id: number
      file: string
      orderNumber: number
    }
  ]
}

export interface OpenContainerResponse {
  userData: string
  prize: ContainerPrize
}

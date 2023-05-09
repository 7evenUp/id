export interface User {
  id: number
  firstName: string
  lastName: string
  username: string
  wallet: string
  telegramId: number
  discordUsername: string
  email: string
  file?: string
}

export interface Transaction {
  description: string
  date: string
  price: string
  status: 'в процессе' | 'успешно' | 'отклонено'
  id: string
}
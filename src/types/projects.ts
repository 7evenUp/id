export interface Project {
  name: string
  isActive: boolean
  options: "all" | "main"
  socials: {
    medium: boolean
    twitter: boolean
    discord: boolean
    telegram: boolean
  }
}
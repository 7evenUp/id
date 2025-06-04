import { createContext, useContext } from "react"

interface AuthContextData {
  lang: "ru" | "en"
  refetchAfterSuccessAuth: VoidFunction
}

const AuthContext = createContext<AuthContextData | null>(null)

export const AuthProvider = AuthContext.Provider

export const useAuthContext = () => {
  const data = useContext(AuthContext)

  if (!data) {
    throw new Error(
      "Нельзя использовать `useAuthContext` вне области `AuthProvider`"
    )
  }

  return data
}

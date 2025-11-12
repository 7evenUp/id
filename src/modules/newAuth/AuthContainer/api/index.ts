import axios from "axios"

import {
  AuthByWalletRequest,
  LoginRequest,
  LoginResponse,
  RegisterByMailRequest,
  RegisterByWalletRequest,
} from "./types"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + "/api/v1",
  withCredentials: true,
})

export default class AuthApi {
  // Вход по почте
  static async login({
    use_verification_code,
    ...body
  }: LoginRequest): Promise<LoginResponse> {
    const response = await api.post("/users/login/", body, {
      params: {
        use_verification_code: use_verification_code,
      },
    })
    return response.data
  }

  // Авторизация через ввод кода с почты / тг-бота
  static async authByCode({ code }: { code: string }): Promise<void> {
    const response = await api.get("/users/authenticate/", {
      params: {
        code,
      },
    })
    return response.data
  }

  // Регистрация по почте
  static async registerByEmail({
    use_verification_code,
    ...body
  }: RegisterByMailRequest): Promise<void> {
    const response = await api.post("/users/register-web/", body, {
      params: {
        use_verification_code: use_verification_code,
      },
    })
    return response.data
  }

  // Авторизация через веб-кошелёк
  static async authByWallet({ ...body }: AuthByWalletRequest): Promise<void> {
    const response = await api.post("/users/authenticate-by-wallet/", body)
    return response.data
  }

  // Регистрация через веб-кошелёк
  static async registerByWallet({
    use_verification_code,
    ...body
  }: RegisterByWalletRequest): Promise<void> {
    const response = await api.post("/users/register-web-wallet/", body, {
      params: {
        use_verification_code: use_verification_code,
      },
    })
    return response.data
  }
}

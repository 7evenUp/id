import axios from "axios"

import { LoginRequest, LoginResponse } from "./types"

const api = axios.create({
  baseURL: "/api/v1",
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
}

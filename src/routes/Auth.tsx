import { useState } from "react"

import Button from "@/shared/ui/Button"
import Input from "@/shared/ui/Input"

const Auth = () => {
  const [email, setEmail] = useState("")

  const onSubmit = async () => {
    try {
      const res = await fetch(
        `https://union-api.crypton.xyz/api/v1/users/login?email=${email}&redirect_url=http://localhost:5173`
      )
    } catch (error) {
      console.error("Error happened: ")
    }
  }

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col bg-white dark:bg-gray-2 rounded-xl border border-gray-1 p-8">
        <h2>Вход в личный кабинет</h2>
        <form>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(evt) => setEmail(evt.currentTarget.value)}
          />
          <Button type="button" onClick={onSubmit}>
            Send
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Auth

import { useMutation } from "@tanstack/react-query"

import Google from "../Icons/Google"

import Loader from "../../shared/Loader"
import Button from "../../shared/Button"

import { LoginRequest } from "../../api/types"
import AuthApi from "../../api"

const GoogleButton = () => {
  const { mutate: login, isPending: isLoginLoading } = useMutation({
    mutationFn: (body: LoginRequest) => AuthApi.login(body),
    onSuccess: (data) => {
      if (data.oauthRedirectTo === null) return

      window.location.href = data.oauthRedirectTo
    },
  })

  const handleGoogle = async () => {
    const redirect_url = window.location.origin

    login({
      oauth: "GOOGLE",
      redirect_url,
    })
  }

  return (
    <Button onClick={handleGoogle}>
      {isLoginLoading ? (
        <Loader />
      ) : (
        <>
          <Google />
          Продолжить с Google
        </>
      )}
    </Button>
  )
}

export default GoogleButton

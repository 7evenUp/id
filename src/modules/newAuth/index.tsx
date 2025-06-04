import AuthContainer from "./AuthContainer"

import { useAppSelector } from "@/redux/hooks"
import { useUserProfileQuery } from "@/redux/api/profile"

const NewAuth = () => {
  const { refetch } = useUserProfileQuery()

  const lang = useAppSelector((state) => state.language.value)

  return (
    <div className="m-auto mobile:py-10 mobile:px-12 mobile:bg-[#fff] mobile:dark:bg-black rounded-xl">
      <AuthContainer
        refetchAfterSuccessAuth={() => refetch()}
        lang={lang || "ru"}
      />
    </div>
  )
}

export default NewAuth

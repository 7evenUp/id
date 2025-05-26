import AuthContainer from "./AuthContainer"

import { useUserProfileQuery } from "@/redux/api/profile"

const NewAuth = () => {
  const { refetch } = useUserProfileQuery()

  return (
    <div className="m-auto mobile:py-10 mobile:px-12 mobile:bg-[#fff] mobile:dark:bg-black rounded-xl">
      <AuthContainer refetchAfterSuccessAuth={() => refetch()} />
    </div>
  )
}

export default NewAuth

import PersonalAccount from "@/modules/personal-account/PersonalAccount"
import Products from "@/modules/products/Products"

import SkeletonLayout from "@/components/SkeletonLayout"

import { useUserProfileQuery } from "@/redux/api/core"

const Index = () => {
  const { isLoading, data, error } = useUserProfileQuery()

  if (error) {
    return (
      <button
        onClick={() =>
          fetch("https://union-api.crypton.xyz/api/v1/users/profile", {
            credentials: "include",
          })
        }
      >
        fetch
      </button>
    )
  }

  if (error) console.log("Error while fetching profile data: ", error)

  return (
    <main className="flex flex-col lg:flex-row justify-between gap-20">
      {isLoading ? (
        <SkeletonLayout />
      ) : (
        data && (
          <>
            <PersonalAccount />
            <Products />
          </>
        )
      )}
    </main>
  )
}

export default Index

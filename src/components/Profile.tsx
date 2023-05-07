import { useMeQuery } from "@/redux/api/core"

import RowItem from "./RowItem"

import Subheading from "./typography/Subheading"

const Profile = () => {
  const { isLoading, data, error } = useMeQuery()
  if (error) return <h2 className="text-5xl text-error">Error happened</h2>

  if (isLoading) return <h2 className="text-5xl text-process">Data loading...</h2>

  if (data) {
    console.log('Coming data: ', data)
  }
  return (
    <div>
      <Subheading className="mb-4">Профиль</Subheading>
      <div className="flex flex-col border-t border-gray-4 dark:border-gray-1">
        <RowItem>
          <span>ник</span>
          <span>{data?.username}</span>
        </RowItem>
        <RowItem>
          <span>почта</span>
          <span>{data?.email}</span>
        </RowItem>
        <RowItem>
          <span>кошелёк</span>
          <span>{data ? data.wallet : '+'}</span>
        </RowItem>
        <div className="flex justify-between items-center gap-10">
          <RowItem className="flex-1">
            <span>discord</span>
            <span>{data ? data.discordUsername : '+'}</span>
          </RowItem>
          <RowItem className="flex-1">
            <span>telegram</span>
            <span>{data ? data.telegramId : '+'}</span>
          </RowItem>
        </div>
      </div>
    </div>
  )
}

export default Profile

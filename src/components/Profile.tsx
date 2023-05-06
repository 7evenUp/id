import RowItem from "./RowItem"
import Subheading from "./typography/Subheading"

const Profile = () => {
  return (
    <div>
      <Subheading className="mb-4">Профиль</Subheading>
      <div className="flex flex-col border-t border-gray-4 dark:border-gray-1">
        <RowItem>
          <span>ник</span>
          <span>Joshua Frost</span>
        </RowItem>
        <RowItem>
          <span>почта</span>
          <span>Jofrost@gmail.com</span>
        </RowItem>
        <RowItem>
          <span>кошелёк</span>
          <span>+</span>
        </RowItem>
        <div className="flex justify-between items-center gap-10">
          <RowItem className="flex-1">
            <span>discord</span>
            <span>+</span>
          </RowItem>
          <RowItem className="flex-1">
            <span>telegram</span>
            <span>+</span>
          </RowItem>
        </div>
      </div>
    </div>
  )
}

export default Profile

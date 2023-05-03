import Subheading from "./typography/Subheading"

const Profile = () => {
  return (
    <div>
      <Subheading className="mb-4">Профиль</Subheading>
      <div className="flex flex-col border-t border-gray-4">
        <div className="flex justify-between items-center py-2 border-b border-gray-4 typography-text-0">
          <span>ник</span>
          <span>Joshua Frost</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-4 typography-text-0">
          <span>почта</span>
          <span>Jofrost@gmail.com</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-4 typography-text-0 text-gray-3">
          <span>кошелёк</span>
          <span>+</span>
        </div>
        <div className="flex justify-between items-center gap-10">
          <div className="flex-1 flex justify-between py-2 border-b border-gray-4 typography-text-0 text-gray-3">
            <span>discord</span>
            <span>+</span>
          </div>
          <div className="flex-1 flex justify-between py-2 border-b border-gray-4 typography-text-0 text-gray-3">
            <span>telegram</span>
            <span>+</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile

import React from "react"

const Profile = () => {
  return (
    <div>
      <h2 className="mb-4">Профиль</h2>
      <div className="flex flex-col border-t border-gray-4">
        <div className="flex justify-between items-center border-b border-gray-4">
          <span>ник</span>
          <span>Joshua Frost</span>
        </div>
        <div className="flex justify-between items-center border-b border-gray-4">
          <span>почта</span>
          <span>Jofrost@gmail.com</span>
        </div>
        <div className="flex justify-between items-center border-b border-gray-4">
          <span>кошелёк</span>
          <span>+</span>
        </div>
        <div className="flex justify-between items-center gap-10">
          <div className="flex-1 flex justify-between border-b border-gray-4">
            <span>discord</span>
            <span>+</span>
          </div>
          <div className="flex-1 flex justify-between border-b border-gray-4">
            <span>telegram</span>
            <span>+</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile

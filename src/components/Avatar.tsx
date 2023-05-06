import React from "react"
import { ReactComponent as BearIcon } from "@/assets/Bear.svg"

const Avatar = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="w-[87px] h-[87px] rounded-full flex items-center justify-center bg-res-bot-blue">
      <BearIcon />
    </div>
  )
}

export default Avatar

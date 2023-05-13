import { ReactComponent as BearIcon } from "@/assets/Bear.svg"

const Avatar = () => {
  return (
    <div className="w-[87px] h-[87px] border-[3px] border-gray-1 rounded-full flex items-center justify-center bg-res-bot-blue">
      <BearIcon />
    </div>
  )
}

export default Avatar

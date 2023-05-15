import React from "react"

const EditContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="absolute right-0 translate-x-[30px] w-[30px] h-full flex items-center pl-1 xl:pl-2.5 opacity-0 group-hover:opacity-100 peer-focus:opacity-100 transition-opacity">
      {children}
    </div>
  )
}

export default EditContainer

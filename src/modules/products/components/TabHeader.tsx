import React from "react"

const TabHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 3xl:gap-[0.781vw] border-b border-gray-4 dark:border-gray-1 pb-4 3xl:pb-[1.042vw]">
      {children}
    </div>
  )
}

export default TabHeader

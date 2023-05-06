import React from "react"

const TabHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center gap-5 border-b border-gray-4 dark:border-gray-1 pb-4">
      {children}
    </div>
  )
}

export default TabHeader

import React from "react"

const TabHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 border-b border-gray-4 dark:border-gray-1 pb-4">
      {children}
    </div>
  )
}

export default TabHeader

import React from "react"

const TagItem: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="group relative inline-block whitespace-nowrap px-4 py-0.5 border-2 rounded-lg border-black">
      {children}
      <span className="absolute inset-0.5 bg-gray-100 -z-10 rounded group-hover:bg-gray-200"></span>
    </div>
  )
}

export default TagItem

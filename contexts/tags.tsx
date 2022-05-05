import React, { createContext, useContext, useState } from "react"

export type TagsContextValue = {
  value: Map<string, string> // tagName, color

  onChange: (value: TagsContextValue["value"]) => void
}

const defaultValue: TagsContextValue["value"] = new Map()

const TagsContext = createContext<TagsContextValue>({
  value: defaultValue,
  onChange: () => {},
})

export const TagsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState(defaultValue)
  return (
    <TagsContext.Provider
      value={{
        value: state,
        onChange: (v) => setState(v),
      }}
    >
      {children}
    </TagsContext.Provider>
  )
}

export const useTags = () => {
  return useContext(TagsContext)
}

export const useTagsValue = () => {
  const { value } = useTags()
  return value
}

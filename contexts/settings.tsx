import React, { createContext, HTMLAttributeAnchorTarget, useContext, useState } from "react"

export type SettingsContextValue = {
  value: {
    hrefTarget: HTMLAttributeAnchorTarget
    highlightColor: string
  }

  onChange: (value: Partial<SettingsContextValue["value"]>) => void
}

const defaultValue: SettingsContextValue["value"] = {
  hrefTarget: "_blank",
  highlightColor: "#95f09c",
}

const SettingsContext = createContext<SettingsContextValue>({
  value: defaultValue,
  onChange: () => {},
})

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState(defaultValue)
  return (
    <SettingsContext.Provider
      value={{
        value: state,
        onChange: (v) =>
          setState({
            ...state,
            ...v,
          }),
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettings = () => {
  return useContext(SettingsContext)
}

export const useSettingsValue = () => {
  const { value } = useSettings()
  return value
}

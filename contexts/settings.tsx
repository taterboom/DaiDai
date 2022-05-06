import React, { createContext, HTMLAttributeAnchorTarget, useContext, useState } from "react"

const LOCAL_SETTINGS_KEY = "_daidai_settings"

type Site = { name?: string; url?: string; tagStr?: string }

export type SettingsContextValue = {
  value: {
    hrefTarget: HTMLAttributeAnchorTarget
    highlightColor: string
    dataOrigin: Array<Site>
  }

  onChange: (value: Partial<SettingsContextValue["value"]>) => void
}

const defaultValue: SettingsContextValue["value"] = {
  hrefTarget: "_blank",
  highlightColor: "#95f09c",
  dataOrigin: [],
}

const getDefaultValue = () => {
  if (typeof localStorage === "undefined") return defaultValue
  const localStr = localStorage.getItem(LOCAL_SETTINGS_KEY)
  if (!localStr) return defaultValue
  try {
    return JSON.parse(localStr)
  } catch (err) {
    //
  }
}

const SettingsContext = createContext<SettingsContextValue>({
  value: defaultValue,
  onChange: () => {},
})

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState(getDefaultValue)
  const handleChange: SettingsContextValue["onChange"] = (v) => {
    const newState = {
      ...state,
      ...v,
    }
    setState(newState)
    localStorage.setItem(LOCAL_SETTINGS_KEY, JSON.stringify(newState))
  }
  return (
    <SettingsContext.Provider
      value={{
        value: state,
        onChange: handleChange,
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

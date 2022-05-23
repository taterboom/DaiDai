import React, { createContext, useContext, useState } from "react"

export type ConfigContextValue = {
  value: {
    githubClientId: string
  }

  onChange: (value: Partial<ConfigContextValue["value"]>) => void
}

const defaultValue: ConfigContextValue["value"] = {
  githubClientId: "",
}

const ConfigContext = createContext<ConfigContextValue>({
  value: defaultValue,
  onChange: () => {},
})

export const ConfigProvider: React.FC<
  { children: React.ReactNode } & ConfigContextValue["value"]
> = ({ children, ...props }) => {
  const [state, setState] = useState(() => ({ ...defaultValue, ...props }))
  const handleChange: ConfigContextValue["onChange"] = (v) => {
    const newState = {
      ...state,
      ...v,
    }
    setState(newState)
  }
  return (
    <ConfigContext.Provider
      value={{
        value: state,
        onChange: handleChange,
      }}
    >
      {children}
    </ConfigContext.Provider>
  )
}

export const useConfig = () => {
  return useContext(ConfigContext)
}

export const useConfigValue = () => {
  const { value } = useConfig()
  return value
}

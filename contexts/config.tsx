import { User } from "@supabase/supabase-js"
import React, { createContext, useContext, useState } from "react"
import { DaidaiApiResult } from "../types/api"

export type ConfigContextValue = {
  value: {
    /**
     * @deprecated
     */
    githubClientId?: string
    userFromServer: User | null
    providerTokenFromServer: string | null
    dataFromServer: DaidaiApiResult[] | null
  }

  onChange: (value: Partial<ConfigContextValue["value"]>) => void
}

const defaultValue: ConfigContextValue["value"] = {
  githubClientId: "",
  userFromServer: null,
  providerTokenFromServer: null,
  dataFromServer: null,
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

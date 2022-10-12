import { createContext, useContext } from "react"
import { SupabaseClient, User } from "@supabase/supabase-js"
import {
  UserProvider as WebUserProvider,
  useUser as webUseUser,
} from "@supabase/auth-helpers-react"

type UserState = ReturnType<typeof webUseUser>

const userContext = createContext<UserState>({
  user: null,
  accessToken: null,
  isLoading: false,
  checkSession: async () => {},
})

export const UserProvider: typeof WebUserProvider = (props) => {
  const value: UserState = {
    user: null,
    accessToken: "",
    isLoading: false,
    checkSession: async () => {},
  }

  return <userContext.Provider {...props} value={value} />
}

export const useUser: typeof webUseUser = () => {
  const context = useContext(userContext)
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserProvider.`)
  }
  return context
}

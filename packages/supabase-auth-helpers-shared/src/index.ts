import {
  UserProvider as WebUserProvider,
  useUser as webUseUser,
} from "@supabase/auth-helpers-react"
import { UserProvider as ExtensionUserProvider, useUser as extensionUseUser } from "./extension"

const isExtension = process.env.NEXT_PUBLIC_EXTENSION === "chrome"

export const UserProvider = isExtension ? ExtensionUserProvider : WebUserProvider
export const useUser = isExtension ? extensionUseUser : webUseUser

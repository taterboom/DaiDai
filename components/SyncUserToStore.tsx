import { useUser } from "@supabase/auth-helpers-react"
import { useEffect } from "react"
import useDaiDaiStore from "../store/daidai"

type SyncUserToStoreProps = {
  children?: React.ReactNode
}

const SyncUserToStore = (props: SyncUserToStoreProps) => {
  const { user } = useUser()
  const setUser = useDaiDaiStore((state) => state.setUser)
  useEffect(() => {
    setUser(user)
  }, [setUser, user])
  return null
}

export default SyncUserToStore

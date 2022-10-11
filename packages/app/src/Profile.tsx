import { useUser } from "@supabase/auth-helpers-react"
import { useMemo } from "react"
import Button, { LinkButton } from "ui/src/Button"
import { PhUserLight } from "ui/src/icons"
import Popup from "ui/src/Popup"

type ProfileProps = {
  children?: React.ReactNode
}

const Profile = (props: ProfileProps) => {
  const { user, isLoading, error } = useUser()

  if (isLoading) return <p>Loading...</p>
  if (!user || error) return <p>Error</p>

  const avatar = (() => {
    const { user_metadata } = user
    if (user_metadata) {
      if (user_metadata.avatar_url) {
        return <img src={user_metadata.avatar_url} alt="" />
      } else if (user_metadata.name) {
        return <span className="text-3xl uppercase">{user_metadata.name.slice(0, 1)}</span>
      }
    }
    return (
      <span className="text-3xl">
        <PhUserLight />
      </span>
    )
  })()

  return (
    <div className="max-w-lg max-h-[80vh] overflow-auto space-y-4 pannel">
      <div className="avatar">
        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          {avatar}
        </div>
      </div>
      {user?.user_metadata?.name ? (
        <div>
          <p>Email:</p>
          <p>{user.user_metadata.name}</p>
        </div>
      ) : null}
      <div>
        <p>Email:</p>
        <p>{user.email}</p>
      </div>
      <LinkButton href="/api/auth/logout" className="!btn-primary">
        Logout
      </LinkButton>
    </div>
  )
}

const ProfilePopup = ({ show, onClose }: { show: boolean; onClose: () => void }) => {
  return (
    <Popup show={show} onClose={onClose}>
      <Profile></Profile>
    </Popup>
  )
}

export default ProfilePopup

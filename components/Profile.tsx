import { useUser } from "@supabase/auth-helpers-react"
import Button, { LinkButton } from "./Common/Button"
import Popup from "./Common/Popup"

type ProfileProps = {
  children?: React.ReactNode
}

const Profile = (props: ProfileProps) => {
  const user = useUser()
  return (
    <div>
      <LinkButton href="/api/auth/logout">Logout</LinkButton>
      <pre className=" max-w-lg">{JSON.stringify(user, null, 2)}</pre>
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

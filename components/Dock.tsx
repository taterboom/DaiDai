import { useUser } from "@supabase/auth-helpers-react"
import { LinkButton } from "./Common/Button"

type DockProps = {
  children?: React.ReactNode
}

const Dock = (props: DockProps) => {
  const { user } = useUser()
  return (
    <div className="fixed right-2 top-2 handlebar">
      <LinkButton href="/?pannel=creator">+</LinkButton>
      <LinkButton href="/?pannel=importer">Import Bookmarks</LinkButton>
      {user ? <LinkButton href="/?pannel=profile">Profile</LinkButton> : null}
    </div>
  )
}

export default Dock

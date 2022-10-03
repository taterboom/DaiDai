import { useUser } from "@supabase/auth-helpers-react"
import { LinkButton } from "./Common/Button"

type DockProps = {
  children?: React.ReactNode
}

const Dock = (props: DockProps) => {
  const { user } = useUser()
  return (
    <div className="fixed right-2 top-2 handlebar">
      <LinkButton href="/?pannel=creator" shallow>
        Create
      </LinkButton>
      <LinkButton href="/?pannel=importer" shallow>
        Import Bookmarks
      </LinkButton>
      <LinkButton href="/?pannel=shortcuts" shallow>
        Shortcuts
      </LinkButton>
      {user ? (
        <LinkButton href="/?pannel=profile" shallow>
          Profile
        </LinkButton>
      ) : (
        <>
          <LinkButton href="/signin" shallow>
            Sign in
          </LinkButton>
          <LinkButton href="/signup" shallow>
            Get Daidai free
          </LinkButton>
        </>
      )}
    </div>
  )
}

export default Dock

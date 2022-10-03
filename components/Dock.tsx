import { useUser } from "@supabase/auth-helpers-react"
import {
  PannelConfig,
  PANNEL_CREATOR,
  PANNEL_IMPORTER,
  PANNEL_PROFILE,
  PANNEL_SHORTCUTS,
} from "../utils/pannel"
import { LinkButton } from "./Common/Button"

type DockProps = {
  children?: React.ReactNode
}

const Dock = (props: DockProps) => {
  const { user } = useUser()
  const shouldReplace = (pannelConfig: PannelConfig) => !pannelConfig[1] && user === null

  return (
    <div className="fixed right-2 top-2 handlebar">
      <LinkButton
        href={`/?pannel=${PANNEL_CREATOR[0]}`}
        shallow
        replace={shouldReplace(PANNEL_CREATOR)}
      >
        Create
      </LinkButton>
      <LinkButton
        href={`/?pannel=${PANNEL_IMPORTER[0]}`}
        shallow
        replace={shouldReplace(PANNEL_IMPORTER)}
      >
        Import Bookmarks
      </LinkButton>
      <LinkButton
        href={`/?pannel=${PANNEL_SHORTCUTS[0]}`}
        shallow
        replace={shouldReplace(PANNEL_SHORTCUTS)}
      >
        Shortcuts
      </LinkButton>
      {user ? (
        <LinkButton
          href={`/?pannel=${PANNEL_PROFILE[0]}`}
          shallow
          replace={shouldReplace(PANNEL_PROFILE)}
        >
          Profile
        </LinkButton>
      ) : (
        <>
          <LinkButton href="/signin">Sign in</LinkButton>
          <LinkButton href="/signup">Get Daidai free</LinkButton>
        </>
      )}
    </div>
  )
}

export default Dock

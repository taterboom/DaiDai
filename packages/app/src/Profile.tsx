import { useSessionContext, useUser } from "@supabase/auth-helpers-react"
import { useRouter } from "next/router"
import { useCallback, useMemo } from "react"
import Button, { LinkButton } from "ui/src/Button"
import { PhUserLight } from "ui/src/icons"
import Popup from "ui/src/Popup"
import useDaidaiStore from "./store/daidai"
import DaidaiObject from "./store/DaidaiObject"
import { selectVerboseTagData } from "./store/selector"
import { jsonToBookmarksHTML } from "./utils/bookmarkHtml2json"
import { supabaseClient } from "./utils/supabaseClient"

type BookmarksExporterProps = {}

function BookmarksExporter(props: BookmarksExporterProps) {
  const verboseTagData = useDaidaiStore(selectVerboseTagData)

  const exportBookmarks = useCallback(() => {
    const htmlStr = jsonToBookmarksHTML(verboseTagData)
    const file = new File([htmlStr], "bookmarks.html", { type: "text/html" })
    const url = URL.createObjectURL(file)
    const a = document.createElement("a")
    a.download = "bookmarks.html"
    a.href = url
    a.click()
  }, [verboseTagData])

  return (
    <Button className="!btn-primary" onClick={exportBookmarks}>
      Export Bookmarks
    </Button>
  )
}

type ProfileProps = {
  children?: React.ReactNode
  onLogout: () => void
}

const Profile = (props: ProfileProps) => {
  const { isLoading, error } = useSessionContext()
  const user = useUser()
  const router = useRouter()

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
      <span className="text-6xl flex items-center justify-center">
        <PhUserLight />
      </span>
    )
  })()

  return (
    <div className="max-w-lg max-h-[80vh] min-w-[300px] overflow-auto space-y-4 pannel">
      <div className="avatar">
        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          {avatar}
        </div>
      </div>
      {user?.user_metadata?.name ? (
        <div>
          <p className="font-semibold">Name:</p>
          <p>{user.user_metadata.name}</p>
        </div>
      ) : null}
      <div>
        <p className="font-semibold">Email:</p>
        <p>{user.email}</p>
      </div>
      <BookmarksExporter />
      <br />
      <Button
        className="!btn-error"
        onClick={() => {
          supabaseClient.auth.signOut().then(() => {
            props.onLogout()
          })
        }}
      >
        Logout
      </Button>
    </div>
  )
}

const ProfilePopup = ({ show, onClose }: { show: boolean; onClose: () => void }) => {
  return (
    <Popup show={show} onClose={onClose}>
      <Profile onLogout={onClose}></Profile>
    </Popup>
  )
}

export default ProfilePopup

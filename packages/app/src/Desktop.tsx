import { useSessionContext, useUser } from "@supabase/auth-helpers-react"
import { useRouter } from "next/router"
import React, { useEffect, useMemo, useRef, useState } from "react"
import { toast } from "react-toastify"
import useDaiDaiStore from "./store/daidai"
import {
  PannelConfig,
  PANNELS,
  PANNEL_CREATOR,
  PANNEL_DELETER,
  PANNEL_EDITOR,
  PANNEL_IMPORTER,
  PANNEL_PROFILE,
  PANNEL_SHORTCUTS,
} from "./utils/pannel"
import { authToast, offlineToastOnce, TOAST_CONFIG } from "./utils/toast"
import BookmarkImporter from "./BookmarkImporter"
import Loading from "ui/src/Loading"
import Popup from "ui/src/Popup"
import DaidaiObjectDeleter from "./DaidaiObjectDeleter"
import {
  DaidaiObjectCreator,
  DaidaiObjectCreatorInExtension,
  DaidaiObjectEditor,
} from "./DaidaiObjectForm"
import Dock from "./Dock"
import ObjectEditor from "./ObjectEditor/ObjectEditor"
import Profile from "./Profile"
import ShortcutManualPopup from "./ShotcutsManual"
import Sites from "./Sites"
import Tags from "./Tags"
import TypeBox from "./TypeBox"
import { isExtension } from "./utils/ua"

const Desktop: React.FC = ({}) => {
  const { isLoading } = useSessionContext()
  const user = useUser()
  const [dataLoading, setDataLoading] = useState(false)
  const initData = useDaiDaiStore((state) => state.initDatda)
  const router = useRouter()
  const pannel = router.query.pannel

  const daidaiObjectIndex = useMemo(() => {
    const maybeStringIndex = Array.isArray(router.query.index)
      ? router.query.index[0]
      : router.query.index
    return maybeStringIndex === undefined ? maybeStringIndex : +maybeStringIndex
  }, [router.query.index])

  const pannelCanShow = (pannelConfig: PannelConfig) =>
    /*(pannelConfig[1] || user !== null) && */ pannel === pannelConfig[0]

  const controlDisabled = typeof pannel === "string"

  const onClosePannel = () => router.push("/")

  // prevent nextjs default scroll behavior
  useEffect(() => {
    router.beforePopState((state) => {
      state.options.scroll = false
      return true
    })
    return () => {
      router.beforePopState((state) => true)
    }
  }, [router])

  const preUserIdRef = useRef<string | null>(null)

  useEffect(() => {
    if (isLoading) return
    if (user) {
      if (preUserIdRef.current !== user.id) {
        setDataLoading(true)
        initData(user)
          .catch((e) => {
            toast.error("Should login first!", TOAST_CONFIG)
            console.error(e)
          })
          .then(() => {
            setDataLoading(false)
            preUserIdRef.current = user.id
          })
      }
    } else {
      initData(null)
      offlineToastOnce()
    }
  }, [initData, user, isLoading])

  // useEffect(() => {
  //   const inPannelDonotSupportAnonymousButAnonymousNow = PANNELS.some(
  //     ([name, supportAnonymous]) => name === pannel && !supportAnonymous && user === null
  //   )
  //   if (inPannelDonotSupportAnonymousButAnonymousNow) {
  //     authToast()
  //   }
  // }, [pannel, user])

  return (
    <div className="min-w-[480px] min-h-[601px] p-16 popup:p-4">
      <Popup closeable={false} show={dataLoading || (isLoading && !user)}>
        <Loading />
      </Popup>
      {/* <Settings></Settings> */}
      {dataLoading && <progress className="progress w-56"></progress>}
      {!controlDisabled && <TypeBox />}
      <Tags></Tags>
      <Sites disabled={controlDisabled}></Sites>
      <Dock />
      {isExtension ? (
        <DaidaiObjectCreatorInExtension
          show={pannelCanShow(PANNEL_CREATOR)}
          onClose={onClosePannel}
        />
      ) : (
        <DaidaiObjectCreator show={pannelCanShow(PANNEL_CREATOR)} onClose={onClosePannel} />
      )}
      <DaidaiObjectEditor
        index={daidaiObjectIndex}
        show={pannelCanShow(PANNEL_EDITOR)}
        onClose={onClosePannel}
      />
      <DaidaiObjectDeleter
        index={daidaiObjectIndex}
        show={pannelCanShow(PANNEL_DELETER)}
        onClose={onClosePannel}
      />
      <BookmarkImporter show={pannelCanShow(PANNEL_IMPORTER)} onClose={onClosePannel} />
      <Profile show={pannelCanShow(PANNEL_PROFILE)} onClose={onClosePannel} />
      <ShortcutManualPopup show={pannelCanShow(PANNEL_SHORTCUTS)} onClose={onClosePannel} />
    </div>
  )
}

export default Desktop

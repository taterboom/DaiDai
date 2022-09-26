import { useRouter } from "next/router"
import React, { useEffect, useMemo, useState } from "react"
import { useSettingsValue } from "../contexts/settings"
import Site from "../modules/Site"
import DaidaiObject from "../store/DaidaiObject"
import BookmarkImporter from "./BookmarkImporter"
import DaidaiObjectDeleter from "./DaidaiObjectDeleter"
import { DaidaiObjectCreator, DaidaiObjectEditor } from "./DaidaiObjectForm"
import Dock from "./Dock"
import ObjectEditor from "./ObjectEditor/ObjectEditor"
import Settings from "./Settings"
import Sites from "./Sites"
import Tags from "./Tags"
import TypeBox from "./TypeBox"

const Desktop: React.FC = ({}) => {
  const router = useRouter()

  const pannel = router.query.pannel

  const daidaiObjectId = useMemo(() => {
    const maybeStringId = Array.isArray(router.query.id) ? router.query.id[0] : router.query.id
    return maybeStringId === undefined ? maybeStringId : +maybeStringId
  }, [router.query.id])

  const controlDisabled = typeof pannel === "string"

  const onClosePannel = router.back

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

  return (
    <div className="p-2">
      {/* <Settings></Settings> */}
      {!controlDisabled && <TypeBox />}
      <Tags></Tags>
      <Sites disabled={controlDisabled}></Sites>
      <Dock />
      <DaidaiObjectCreator show={pannel === "creator"} onClose={onClosePannel} />
      <DaidaiObjectEditor id={daidaiObjectId} show={pannel === "editor"} onClose={onClosePannel} />
      <DaidaiObjectDeleter
        id={daidaiObjectId}
        show={pannel === "deleter"}
        onClose={onClosePannel}
      />
      <BookmarkImporter show={pannel === "importer"} onClose={onClosePannel} />
    </div>
  )
}

export default Desktop

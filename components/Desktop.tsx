import { useRouter } from "next/router"
import React, { useMemo, useState } from "react"
import { useSettingsValue } from "../contexts/settings"
import Site from "../modules/Site"
import Settings from "./Settings"
import Sites from "./Sites"
import Tags from "./Tags"

const Desktop: React.FC = ({}) => {
  const router = useRouter()
  const { dataOrigin } = useSettingsValue()

  const { sitesMap, tagsMap } = useMemo(() => {
    const _sitesMap = new Map<string, Site>()
    const _tagsMap = new Map<string, Set<string>>()
    for (const site of dataOrigin) {
      const s = new Site(site.name || "", site.url || "", site.tagStr || "")
      _sitesMap.set(s.url, s)
      s.tags.forEach((tag) => {
        _tagsMap.has(tag) ? _tagsMap.get(tag)?.add(s.url) : _tagsMap.set(tag, new Set([s.url]))
      })
    }
    return {
      sitesMap: _sitesMap,
      tagsMap: _tagsMap,
    }
  }, [dataOrigin])

  const settingsPannelShow = router.query.pannel === "settings"

  return (
    <div className="p-2">
      <Settings></Settings>
      <Tags value={tagsMap} blur={settingsPannelShow}></Tags>
      <Sites value={[...sitesMap.values()]} blur={settingsPannelShow}></Sites>
    </div>
  )
}

export default Desktop

import React, { useMemo } from "react"
import Site from "../modules/Site"
import Sites from "./Sites"
import Tags from "./Tags"

type SitesJSON = {
  sites: Array<{ name: string; url: string; tagStr: string }>
}

type SitesProps = {
  json: SitesJSON
}

const Desktop: React.FC<SitesProps> = ({ json }) => {
  const { sitesMap, tagsMap } = useMemo(() => {
    const _sitesMap = new Map<string, Site>()
    const _tagsMap = new Map<string, Set<string>>()
    for (const site of json.sites) {
      const s = new Site(site.name, site.url, site.tagStr)
      _sitesMap.set(s.url, s)
      s.tags.forEach((tag) => {
        _tagsMap.has(tag) ? _tagsMap.get(tag)?.add(s.url) : _tagsMap.set(tag, new Set([s.url]))
      })
    }
    return {
      sitesMap: _sitesMap,
      tagsMap: _tagsMap,
    }
  }, [json])

  return (
    <div className="p-2">
      <Tags value={tagsMap}></Tags>
      <Sites value={[...sitesMap.values()]}></Sites>
    </div>
  )
}

export default Desktop

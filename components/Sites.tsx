import { useMemo } from "react"
import { useTagsValue } from "../contexts/tags"
import Site from "../modules/Site"
import SiteItem from "./SiteItem"

const Sites: React.FC<{ value: Site[] }> = ({ value }) => {
  const selectedTagsMap = useTagsValue()
  const visibleItems = useMemo(
    () =>
      selectedTagsMap.size === 0
        ? value
        : value.filter((item) => {
            for (const tag of selectedTagsMap.keys()) {
              if (!item.tags.includes(tag)) {
                return false
              }
            }
            return true
          }),
    [value, selectedTagsMap]
  )
  return (
    <section className="grid grid-cols-[repeat(5,_minmax(200px,_1fr))] gap-4">
      {visibleItems.map((site) => (
        <SiteItem value={site} key={site.url}></SiteItem>
      ))}
    </section>
  )
}

export default Sites

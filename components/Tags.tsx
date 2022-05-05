import { useSettingsValue } from "../contexts/settings"
import { useTags } from "../contexts/tags"
import TagItem from "./TagItem"
import TypeBox from "./TypeBox"

const Tags: React.FC<{ value: Map<string, Set<string>> }> = ({ value }) => {
  const { value: selectTags, onChange } = useTags()
  const { highlightColor } = useSettingsValue()
  const checkTags = (text: string) => {
    if (!text.trim()) return
    const newTagsMap = new Map(selectTags)
    let changed = false
    for (const tag of value.keys()) {
      if (tag.startsWith(text)) {
        if (!selectTags.has(tag)) {
          newTagsMap.set(tag, highlightColor)
          changed = true
        }
      } else {
        if (selectTags.has(tag)) {
          newTagsMap.delete(tag)
          changed = true
        }
      }
    }
    if (changed) {
      onChange(newTagsMap)
    }
  }
  return (
    <section>
      <TypeBox onChange={checkTags}></TypeBox>
      <ul className="flex flex-wrap">
        {[...value].map(([tag, urlsSet]) => (
          <li key={tag} className="ml-2 mb-2">
            <TagItem value={tag}></TagItem>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Tags

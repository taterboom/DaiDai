import React from "react"
import { useSettingsValue } from "../contexts/settings"
import { useTags } from "../contexts/tags"

const TagItem: React.FC<{ value: string }> = ({ value }) => {
  const { value: tagsMap, onChange } = useTags()
  const { highlightColor } = useSettingsValue()
  return (
    <button
      className="group relative inline-block whitespace-nowrap px-4 py-0.5 border-2 rounded-lg border-black"
      onClick={() => {
        const newTagsMap = new Map(tagsMap)
        if (newTagsMap.has(value)) {
          newTagsMap.delete(value)
        } else {
          newTagsMap.set(value, highlightColor)
        }
        onChange(newTagsMap)
      }}
    >
      {value}
      <span
        className="absolute inset-0.5 bg-gray-100 -z-10 rounded group-hover:bg-gray-200"
        style={tagsMap.has(value) ? { backgroundColor: tagsMap.get(value) } : undefined}
      ></span>
    </button>
  )
}

export default TagItem

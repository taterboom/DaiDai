import { useCallback, useMemo } from "react"
import useDaiDaiStore from "../store/daidai"
import { selectTags } from "../store/selector"
import TypeBox from "./TypeBox"
import clsx from "classnames"

const TagItem = ({
  value,
  active,
  onClick,
}: {
  value: string
  active: boolean
  onClick?: () => void
}) => {
  return (
    <button
      className="group relative inline-block whitespace-nowrap px-4 py-0.5 border-2 rounded-lg border-black"
      onClick={() => {
        onClick?.()
      }}
    >
      {value}
      <span
        className={clsx(
          "absolute inset-0.5 bg-gray-100 -z-10 rounded group-hover:bg-gray-200",
          active && "!bg-gray-400"
        )}
      ></span>
    </button>
  )
}

const Tags = () => {
  const tags = useDaiDaiStore(selectTags)
  const activeTags = useDaiDaiStore((state) => state.activeTags)
  const toggleTag = useDaiDaiStore((state) => state.toggleTag)

  return (
    <section>
      <ul className="flex flex-wrap mb-2">
        {tags.map((tag) => (
          <li key={tag} className="mr-2 mb-2">
            <TagItem
              value={tag}
              active={activeTags.includes(tag)}
              onClick={() => toggleTag(tag)}
            ></TagItem>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Tags

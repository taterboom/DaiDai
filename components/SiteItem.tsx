import { useUser } from "@supabase/auth-helpers-react"
import { useRouter } from "next/router"
import { useMemo } from "react"
import { toast } from "react-toastify"
import useDaiDaiStore from "../store/daidai"
import DaidaiObject from "../store/DaidaiObject"
import { selectTags } from "../store/selector"
import useSettingsStore from "../store/settings"
import { isAnonymousDaidai } from "../utils/anonymous"
import { PannelConfig, PANNEL_DELETER, PANNEL_EDITOR } from "../utils/pannel"
import { TOAST_CONFIG } from "../utils/toast"
import { LinkButton } from "./Common/Button"
import {
  FluentDocumentPageTopLeft24Regular,
  MaterialSymbolsDeleteOutlineSharp,
  IonIosLink,
} from "./Common/icons"
import clsx from "classnames"

const useTagsColorMap = () => {
  const tags = useDaiDaiStore(selectTags)
  const highlightColors = useSettingsStore((state) => state.highlightColors)
  return useMemo(() => {
    const tagsColorMap = new Map<string, { index: number; color: string }>()
    tags.forEach((tag, index) => {
      tagsColorMap.set(tag, {
        index,
        color: highlightColors[index % highlightColors.length],
      })
    })
    return tagsColorMap
  }, [highlightColors, tags])
}

const SiteItem: React.FC<{
  index: number
  value: DaidaiObject
  active?: boolean
  disable?: boolean
}> = ({ index, value, active, disable }) => {
  const hrefTarget = useSettingsStore((state) => state.hrefTarget)
  const { user } = useUser()
  const tagsColorMap = useTagsColorMap()
  const activeTags = useDaiDaiStore((state) => state.activeTags)
  const shouldReplace = (pannelConfig: PannelConfig) => !pannelConfig[1] && user === null

  return (
    <figure
      className={clsx(
        active && "!bg-primary-focus",
        "group relative flex items-center p-5 py-3 bg-main transition-colors hover:bg-main-focus"
      )}
    >
      {/* cover */}
      {value.iconUrl ? (
        <div className="avatar">
          <div className="w-12 rounded">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value.iconUrl || ""}
              alt={value.title || ""}
              width="48"
              height="48"
              className="rounded-full w-12 h-12"
            />
          </div>
        </div>
      ) : (
        <div className="avatar placeholder">
          <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
            <span className="text-2xl uppercase">
              {value.title ? value.title.slice(0, 1) : <IonIosLink />}
            </span>
          </div>
        </div>
      )}
      {/* title and tags */}
      <figcaption className="ml-4 overflow-hidden">
        <a
          href={value.url || ""}
          target={hrefTarget}
          title={value.title || ""}
          className="line-clamp-2 text-white"
        >
          <span className="absolute inset-0"></span>
          {value.title || value.url}
        </a>
        <ul className="flex flex-wrap gap-1 mt-2">
          {value.tags.map((tag) => {
            const isTagActive = activeTags.includes(tag)
            return (
              <li
                key={tag}
                className={clsx(
                  "relative px-1.5 border text-xs scale-90 origin-left transition-colors",
                  isTagActive ? "text-black" : "border-white text-white "
                )}
                style={{
                  backgroundColor: isTagActive ? tagsColorMap.get(tag)?.color : undefined,
                  borderColor: tagsColorMap.get(tag)?.color,
                }}
              >
                {tag}
              </li>
            )
          })}
        </ul>
      </figcaption>
      {/* operation bar */}
      {!disable && (
        <div className="group-hover:opacity-100 opacity-0 transition-opacity pointer-events-none absolute right-1 top-1 flex handlebar backdrop-blur-sm">
          <LinkButton
            className="!btn-xs pointer-events-auto"
            href={`/?pannel=${PANNEL_EDITOR[0]}&index=${index}`}
            shallow
            replace={shouldReplace(PANNEL_EDITOR)}
            title="edit"
            onClick={(e) => {
              if (isAnonymousDaidai(value.id)) {
                toast("This cannot be updated, you can delete it.", TOAST_CONFIG)
                e.preventDefault()
              }
            }}
          >
            <FluentDocumentPageTopLeft24Regular />
          </LinkButton>
          <LinkButton
            className="!btn-xs pointer-events-auto"
            href={`/?pannel=${PANNEL_DELETER[0]}&index=${index}`}
            shallow
            title="delete"
            replace={shouldReplace(PANNEL_DELETER)}
          >
            <MaterialSymbolsDeleteOutlineSharp />
          </LinkButton>
        </div>
      )}
    </figure>
  )
}

export default SiteItem

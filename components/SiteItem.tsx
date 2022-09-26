import cx from "classnames"
import { useRouter } from "next/router"
import { useState } from "react"
import { useSettingsValue } from "../contexts/settings"
import DaidaiObject from "../store/DaidaiObject"
import Button, { LinkButton } from "./Common/Button"
import { DaidaiObjectEditor } from "./DaidaiObjectForm"

const SiteItem: React.FC<{
  index: number
  value: DaidaiObject
  active?: boolean
  disable?: boolean
}> = ({ index, value, active, disable }) => {
  const settings = useSettingsValue()
  const router = useRouter()
  return (
    <figure
      className={cx(
        active && "bulge",
        "relative flex items-center px-4 py-2 border-2 rounded-2xl border-black hover:bulge active:unbulge"
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={value.iconUrl || ""}
        alt={value.title || ""}
        width="40"
        height="40"
        className="rounded-full w-10 h-10"
      />
      <figcaption className="ml-4 truncate">
        <a href={value.url || ""} target={settings.hrefTarget} title={value.title || ""}>
          <span className="absolute inset-0"></span>
          {value.title}
        </a>
        <ul className="flex flex-wrap">
          {value.tags.map((tag) => (
            <li
              key={tag}
              className="relative opacity-70 px-1.5 border border-black rounded-md text-xs scale-90 origin-left"
            >
              {tag}
              <div className="absolute inset-0.5 -z-10 rounded bg-gray-100"></div>
            </li>
          ))}
        </ul>
      </figcaption>
      {!disable && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col">
          <LinkButton href={`/?pannel=editor&id=${index}`} className="btn-sm">
            =
          </LinkButton>
          <LinkButton href={`/?pannel=deleter&id=${index}`} className="btn-sm">
            -
          </LinkButton>
        </div>
      )}
    </figure>
  )
}

export default SiteItem

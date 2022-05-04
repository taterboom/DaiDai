import Site from "../modules/Site"
import { useSettingsValue } from "./Settings"
import cx from "classnames"
import { useState } from "react"

const SiteItem: React.FC<{ value: Site; active?: boolean }> = ({ value, active }) => {
  const settings = useSettingsValue()
  return (
    <figure
      className={cx(
        active && "bulge",
        "relative flex items-center px-4 py-2 border-2 rounded-2xl border-black hover:bulge active:collapse"
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={value.iconUrl} alt={value.name} width="40" height="40" className="rounded-full" />
      <figcaption className="ml-4">
        <a href={value.url} target={settings.hrefTarget}>
          <span className="absolute inset-0"></span>
          {value.name}
        </a>
        <ul className="flex">
          {value.tags.map((tag) => (
            <li
              key={tag}
              className="relative opacity-70 px-2 py-0.5 border border-black rounded-md text-xs scale-75 origin-left"
            >
              {tag}
              <div className="absolute inset-0.5 -z-10 rounded bg-gray-300"></div>
            </li>
          ))}
        </ul>
      </figcaption>
    </figure>
  )
}

export default SiteItem

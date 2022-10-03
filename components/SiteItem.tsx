import { useUser } from "@supabase/auth-helpers-react"
import cx from "classnames"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import { useSettingsValue } from "../contexts/settings"
import DaidaiObject from "../store/DaidaiObject"
import { isAnonymousDaidai } from "../utils/anonymous"
import { PannelConfig, PANNEL_DELETER, PANNEL_EDITOR } from "../utils/pannel"
import { TOAST_CONFIG } from "../utils/toast"
import { LinkButton } from "./Common/Button"
import {
  FluentDocumentPageTopLeft24Regular,
  MaterialSymbolsDeleteOutlineSharp,
  IonIosLink,
} from "./Common/icons"

const SiteItem: React.FC<{
  index: number
  value: DaidaiObject
  active?: boolean
  disable?: boolean
}> = ({ index, value, active, disable }) => {
  const settings = useSettingsValue()
  const { user } = useUser()
  const shouldReplace = (pannelConfig: PannelConfig) => !pannelConfig[1] && user === null

  return (
    <figure
      className={cx(
        active && "bulge",
        "group relative flex items-center px-4 py-2 border-2 rounded-2xl border-black hover:bulge active:unbulge"
      )}
    >
      {value.iconUrl ? (
        <div className="avatar">
          <div className="w-12 rounded">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value.iconUrl || ""}
              alt={value.title || ""}
              width="48"
              height="48"
              className="rounded-full w-10 h-10"
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
      <figcaption className="ml-4 truncate">
        <a href={value.url || ""} target={settings.hrefTarget} title={value.title || ""}>
          <span className="absolute inset-0"></span>
          {value.title || value.url}
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
        <div className="group-hover:opacity-100 opacity-0 transition-opacity pointer-events-none absolute right-1 top-1 flex handlebar backdrop-blur-sm">
          <LinkButton
            className="!btn-xs pointer-events-auto"
            href={`/?pannel=${PANNEL_EDITOR[0]}&index=${index}`}
            shallow
            replace={shouldReplace(PANNEL_EDITOR)}
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

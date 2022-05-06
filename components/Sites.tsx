import { useEffect, useMemo, useRef, useState } from "react"
import { useTagsValue } from "../contexts/tags"
import Site from "../modules/Site"
import SiteItem from "./SiteItem"
import tinykeys from "tinykeys"
import classNames from "classnames"
import { useSettingsValue } from "../contexts/settings"

const RESPONSIVE_DATA = {
  mobile: {
    size: 0,
    count: 2,
    className: "grid-cols-[repeat(2,_minmax(200px,_1fr))]",
  },
  sm: {
    size: 640,
    count: 3,
    className: "grid-cols-[repeat(3,_minmax(200px,_1fr))]",
  },
  md: {
    size: 768,
    count: 4,
    className: "grid-cols-[repeat(4,_minmax(180px,_1fr))]",
  },
  lg: {
    size: 1024,
    count: 5,
    className: "grid-cols-[repeat(5,_minmax(200px,_1fr))]",
  },
  xl: {
    size: 1280,
    count: 6,
    className: "grid-cols-[repeat(6,_minmax(200px,_1fr))]",
  },
  "2xl": {
    size: 1536,
    count: 7,
    className: "grid-cols-[repeat(7,_minmax(200px,_1fr))]",
  },
  "3xl": {
    size: 1800,
    count: 8,
    className: "grid-cols-[repeat(8,_minmax(200px,_1fr))]",
  },
}
const RESPONSIVE_LEVEL: Array<keyof typeof RESPONSIVE_DATA> = [
  "3xl",
  "2xl",
  "xl",
  "lg",
  "md",
  "sm",
  "mobile",
]

const getScreenLevel = () => {
  if (typeof window === "undefined") return 0
  const w = document.documentElement.clientWidth
  for (let i = 0; i < RESPONSIVE_LEVEL.length; i++) {
    if (w >= RESPONSIVE_DATA[RESPONSIVE_LEVEL[i]].size) {
      return i
    }
  }
  return 0
}

const Sites: React.FC<{ blur: boolean; value: Site[] }> = ({ blur, value }) => {
  const [screenLevel, setScreenLevel] = useState(getScreenLevel)
  const screenLevelRef = useRef(screenLevel)
  screenLevelRef.current = screenLevel
  const [activeIndex, setActiveIndex] = useState(-1)
  const activeIndexRef = useRef(activeIndex)
  activeIndexRef.current = activeIndex
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
  const visibleItemsRef = useRef(visibleItems)
  visibleItemsRef.current = visibleItems
  const settingsValue = useSettingsValue()
  const settingsValueRef = useRef(settingsValue)
  settingsValueRef.current = settingsValue
  useEffect(() => {
    if (typeof window === "undefined") return
    if (!blur) {
      const nav = (url: string) =>
        settingsValueRef.current.hrefTarget === "_blank"
          ? window.open(url)
          : window.location.assign(url)
      const generateNav = (index: number) => (e: Event) => {
        e.preventDefault()
        const site = visibleItemsRef.current[index]
        if (site.url) {
          nav(site.url)
        }
      }
      const enterNav = () => {
        const site = visibleItemsRef.current[activeIndexRef.current]
        if (site.url) {
          nav(site.url)
        }
      }
      const generateMove = (type: "top" | "right" | "bottom" | "left") => (e: Event) => {
        e.preventDefault()
        switch (type) {
          case "right":
            setActiveIndex((index) => Math.min(index + 1, visibleItemsRef.current.length - 1))
            break
          case "left":
            setActiveIndex((index) => Math.max(index - 1, -1))
            break
          case "bottom":
            setActiveIndex((index) =>
              Math.min(
                (index === -1 ? 0 : index) +
                  RESPONSIVE_DATA[RESPONSIVE_LEVEL[screenLevelRef.current]].count,
                visibleItemsRef.current.length - 1
              )
            )
            break
          case "top":
            setActiveIndex((index) =>
              Math.max(index - RESPONSIVE_DATA[RESPONSIVE_LEVEL[screenLevelRef.current]].count, -1)
            )
            break
          default:
            break
        }
      }
      const unsubscribe = tinykeys(window, {
        "$mod+1": generateNav(0),
        "$mod+2": generateNav(1),
        "$mod+3": generateNav(2),
        "$mod+4": generateNav(3),
        "$mod+5": generateNav(4),
        "$mod+6": generateNav(5),
        "$mod+7": generateNav(6),
        "$mod+8": generateNav(7),
        "$mod+9": generateNav(8),
        ArrowUp: generateMove("top"),
        ArrowRight: generateMove("right"),
        ArrowDown: generateMove("bottom"),
        ArrowLeft: generateMove("left"),
        Enter: enterNav,
      })
      return () => {
        unsubscribe()
      }
    }
  }, [blur])
  useEffect(() => {
    window.addEventListener("size", () => {
      setScreenLevel(getScreenLevel())
    })
  }, [])

  return (
    <section className="grid gap-4 grid-cols-[repeat(2,_minmax(200px,_1fr))] sm:grid-cols-[repeat(3,_minmax(200px,_1fr))] md:grid-cols-[repeat(4,_minmax(200px,_1fr))] lg:grid-cols-[repeat(5,_minmax(200px,_1fr))] xl:grid-cols-[repeat(6,_minmax(200px,_1fr))] 2xl:grid-cols-[repeat(7,_minmax(200px,_1fr))] 3xl:grid-cols-[repeat(8,_minmax(200px,_1fr))]">
      {visibleItems.map((site, index) => (
        <SiteItem value={site} key={site.url} active={index === activeIndex}></SiteItem>
      ))}
    </section>
  )
}

export default Sites

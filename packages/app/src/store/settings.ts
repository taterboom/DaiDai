import { HTMLAttributeAnchorTarget } from "react"
import create from "zustand"
import { immer } from "zustand/middleware/immer"

type SettingsStore = {
  hrefTarget: HTMLAttributeAnchorTarget
  highlightColors: string[]
}

const useSettingsStore = create<SettingsStore>()(
  immer((set, get) => ({
    hrefTarget: "_blank",
    highlightColors: ["#F471B5", "#F3B209", "#2BD4BD"],
  }))
)

export default useSettingsStore

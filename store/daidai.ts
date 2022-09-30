import { supabaseClient } from "@supabase/auth-helpers-nextjs"
import { omit } from "lodash"
import { HTMLAttributeAnchorTarget } from "react"
import create from "zustand"
import { persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"
import { DaidaiApiResult } from "../types/api"
import DaidaiObject from "./DaidaiObject"
import logger from "./plugins/logger"
import { selectTags } from "./selector"

export type DaidaiState = {
  data: DaidaiObject[]
  activeTags: string[]
  hrefTarget: HTMLAttributeAnchorTarget
  highlightColor: string

  reset: (daidaiObjects: DaidaiObject[]) => void
  add: (...daidaiObjects: DaidaiObject[]) => void
  update: (index: number, daidaiObject: DaidaiObject) => void
  remove: (index: number) => void
  toggleTag: (tag: string) => void
  typeTag: (text: string) => void
}

const useDaiDaiStore = create<DaidaiState>()(
  logger(
    persist(
      immer((set, get) => ({
        data: [],
        activeTags: [],
        hrefTarget: "_blank",
        highlightColor: "#95f09c",

        reset: (daidaiObjects) => {
          set({
            data: daidaiObjects,
          })
        },
        add: async (...daidaiObjects) => {
          const { data, error } = await supabaseClient.from<DaidaiApiResult>("daidais").insert(
            daidaiObjects.map((item) => ({
              url: item.url,
              c_html: item.contentHTML,
            }))
          )
          console.log("!!", data, error)
          set((state) => {
            state.data.push(...daidaiObjects)
          })
        },
        update: (index, daidaiObject) => {
          set((state) => {
            if (index in state.data) {
              state.data[index] = daidaiObject
            }
          })
        },
        remove(index) {
          set((state) => {
            state.data.splice(index, 1)
          })
        },
        toggleTag: (tag: string) => {
          const index = get().activeTags.indexOf(tag)
          if (index === -1) {
            set((state) => {
              state.activeTags.push(tag)
            })
          } else {
            set((state) => {
              state.activeTags.splice(index, 1)
            })
          }
        },
        typeTag: (text) => {
          if (!text)
            set({
              activeTags: [],
            })
          if (!text.trim()) return
          const tags = selectTags(get())
          set((state) => {
            state.activeTags = tags.filter((tag) =>
              tag.toUpperCase().startsWith(text.toUpperCase())
            )
          })
        },
      })),
      {
        name: "__daidai",
        serialize: (localState) => {
          return JSON.stringify({
            ...localState,
            state: {
              ...omit(localState.state, "activeTags"),
              data: localState.state.data.map((item) => item.dehydrate()),
            },
          })
        },
        deserialize: (str) => {
          console.time("init with localStorage")
          const result = JSON.parse(str)
          result.state.data = result.state.data
            .map((item: any) => DaidaiObject.hydrate(item))
            .filter(Boolean)
          console.timeEnd("init with localStorage")
          return result
        },
      }
    )
  )
)

export default useDaiDaiStore

import { supabaseClient } from "@supabase/auth-helpers-nextjs"
import { User } from "@supabase/supabase-js"
import { HTMLAttributeAnchorTarget } from "react"
import create from "zustand"
import { immer } from "zustand/middleware/immer"

import { DaidaiApiResult, daidaisQuery } from "../types/api"
import DaidaiObject from "./DaidaiObject"
import logger from "./plugins/logger"
import { selectTags } from "./selector"

class NoAuthError extends Error {}

function checkAuth(user: DaidaiState["user"]) {
  if (user === null) throw new NoAuthError()
}

export type DaidaiState = {
  data: DaidaiObject[]
  user: User | null
  activeTags: string[]
  hrefTarget: HTMLAttributeAnchorTarget
  highlightColor: string

  setUser: (user: User | null) => void
  initDatda: () => Promise<void>
  reset: (daidaiObjects: DaidaiObject[]) => void
  add: (...daidaiObjects: DaidaiObject[]) => Promise<void>
  update: (index: number, daidaiObject: DaidaiObject) => Promise<void>
  remove: (index: number) => Promise<void>
  toggleTag: (tag: string) => void
  typeTag: (text: string) => void
}

const useDaiDaiStore = create<DaidaiState>()(
  logger(
    // persist(
    immer((set, get) => ({
      user: null,
      data: [],
      activeTags: [],
      hrefTarget: "_blank",
      highlightColor: "#95f09c",

      initDatda: async () => {
        const state = get()
        checkAuth(state.user)
        const result = await daidaisQuery.select("id, url, c_html")
        if (result.error) throw result.error
        set({
          data: result.data.map(
            (item) => new DaidaiObject({ url: item.url, contentHTML: item.c_html, id: item.id })
          ),
        })
      },
      setUser: (user) => {
        set({
          user,
        })
      },
      reset: (daidaiObjects) => {
        set({
          data: daidaiObjects,
        })
      },
      add: async (...daidaiObjects) => {
        const state = get()
        checkAuth(state.user)
        const { error } = await supabaseClient.from<DaidaiApiResult>("daidais").insert(
          daidaiObjects.map((item) => ({
            url: item.url,
            c_html: item.contentHTML,
            user_id: state.user!.id,
          }))
        )
        if (error) throw error
        set((state) => {
          state.data.push(...daidaiObjects)
        })
      },
      update: async (index, daidaiObject) => {
        const state = get()
        checkAuth(state.user)
        const preDaidaiObject = state.data[index]
        if (!preDaidaiObject) return
        const { error } = await supabaseClient
          .from<DaidaiApiResult>("daidais")
          .update({
            url: daidaiObject.url,
            c_html: daidaiObject.contentHTML,
          })
          .eq("id", preDaidaiObject.id)
        console.log("!e", error)
        if (error) throw error
        set((state) => {
          if (index in state.data) {
            state.data[index] = daidaiObject
          }
        })
      },
      remove: async (index) => {
        const state = get()
        checkAuth(state.user)
        const daidaiObject = state.data[index]
        if (!daidaiObject) return
        const { error } = await supabaseClient
          .from<DaidaiApiResult>("daidais")
          .delete()
          .eq("id", daidaiObject.id)
        if (error) throw error
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
          state.activeTags = tags.filter((tag) => tag.toUpperCase().startsWith(text.toUpperCase()))
        })
      },
    }))
    // {
    //   name: "__daidai",
    //   serialize: (localState) => {
    //     return JSON.stringify({
    //       ...localState,
    //       state: {
    //         ...omit(localState.state, "activeTags"),
    //         data: localState.state.data.map((item) => item.dehydrate()),
    //       },
    //     })
    //   },
    //   deserialize: (str) => {
    //     console.time("init with localStorage")
    //     const result = JSON.parse(str)
    //     result.state.data = result.state.data
    //       .map((item: any) => DaidaiObject.hydrate(item))
    //       .filter(Boolean)
    //     console.timeEnd("init with localStorage")
    //     return result
    //   },
    // }
    // )
  )
)

export default useDaiDaiStore

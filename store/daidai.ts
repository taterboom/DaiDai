import { supabaseClient, User } from "@supabase/auth-helpers-nextjs"
import create from "zustand"
import { immer } from "zustand/middleware/immer"

import { daidaisQuery } from "../types/api"
import { ANONYMOUS_DAIDAIS, isAnonymousDaidai } from "../utils/anonymous"
import DaidaiObject from "./DaidaiObject"
import logger from "./plugins/logger"
import { selectTags } from "./selector"

export type DaidaiState = {
  data: DaidaiObject[]
  activeTags: string[]

  initDatda: (user: User | null) => Promise<void>
  reset: (daidaiObjects: DaidaiObject[]) => void
  add: (userId: string, ...daidaiObjects: DaidaiObject[]) => Promise<void>
  update: (index: number, daidaiObject: DaidaiObject) => Promise<void>
  remove: (index: number) => Promise<void>
  toggleTag: (tag: string) => void
  typeTag: (text: string) => void
}

const useDaiDaiStore = create<DaidaiState>()(
  logger(
    // persist(
    immer((set, get) => ({
      data: [],
      activeTags: [],

      initDatda: async (user) => {
        if (user) {
          const result = await daidaisQuery().select("id, url, c_html")
          if (result.error) throw result.error
          const daidaisJSON = [
            ...ANONYMOUS_DAIDAIS.filter((item) => !user.user_metadata?.[item.id]),
            ...result.data,
          ]
          set({
            data: daidaisJSON.map(
              (item) => new DaidaiObject({ url: item.url, contentHTML: item.c_html, id: item.id })
            ),
          })
        } else {
          set({
            data: ANONYMOUS_DAIDAIS.map(
              (item) => new DaidaiObject({ url: item.url, contentHTML: item.c_html, id: item.id })
            ),
          })
        }
      },
      reset: (daidaiObjects) => {
        set({
          data: daidaiObjects,
        })
      },
      add: async (userId, ...daidaiObjects) => {
        const { error } = await daidaisQuery().insert(
          daidaiObjects.map((item) => ({
            url: item.url,
            c_html: item.contentHTML,
            user_id: userId,
          }))
        )
        if (error) throw error
        set((state) => {
          state.data.push(...daidaiObjects)
        })
      },
      update: async (index, daidaiObject) => {
        const state = get()
        const preDaidaiObject = state.data[index]
        if (!preDaidaiObject) return
        if (isAnonymousDaidai(preDaidaiObject.id)) {
          return
        }
        const { error } = await daidaisQuery()
          .update({
            url: daidaiObject.url,
            c_html: daidaiObject.contentHTML,
          })
          .eq("id", preDaidaiObject.id)
        console.error("e", error)
        if (error) throw error
        set((state) => {
          if (index in state.data) {
            state.data[index] = daidaiObject
          }
        })
      },
      remove: async (index) => {
        const state = get()
        const daidaiObject = state.data[index]
        if (!daidaiObject) return
        if (isAnonymousDaidai(daidaiObject.id)) {
          const { error } = await supabaseClient.auth.update({
            data: {
              [daidaiObject.id]: true,
            },
          })
          if (error) throw error
        } else {
          const { error } = await daidaisQuery().delete().eq("id", daidaiObject.id)
          if (error) throw error
        }
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

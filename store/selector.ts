import { intersection, memoize } from "lodash"
import { DaidaiState } from "./daidai"
import DaidaiObject from "./DaidaiObject"

const getTagsSet = memoize((data: DaidaiState["data"]) => {
  const tagsSet = new Set<string>()
  data.forEach((daidaiObj) => {
    daidaiObj.tags.forEach((t) => tagsSet.add(t))
  })
  return [...tagsSet]
})

export const selectTags = (state: DaidaiState) => {
  return getTagsSet(state.data)
}

export const selectActiveDaidaiObjects = (state: DaidaiState) => {
  const activeDaidaiObjects: DaidaiObject[] = []
  state.data.forEach((daidaiObj) => {
    if (intersection(daidaiObj.tags, state.activeTags).length > 0) {
      activeDaidaiObjects.push(daidaiObj)
    }
  })
  return activeDaidaiObjects
}

export const selectVisibleDaidaiObjects = (state: DaidaiState) => {
  return state.activeTags.length > 0 ? selectActiveDaidaiObjects(state) : state.data
}

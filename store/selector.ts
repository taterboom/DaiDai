import { intersection } from "lodash"
import { DaidaiState } from "./daidai"
import DaidaiObject from "./DaidaiObject"

export const selectTags = (state: DaidaiState) => {
  const tagsSet = new Set<string>()
  state.data.forEach((daidaiObj) => {
    daidaiObj.tags.forEach((t) => tagsSet.add(t))
  })
  return [...tagsSet]
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

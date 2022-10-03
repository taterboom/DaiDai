export type PannelConfig = [string, boolean] // [name, supportAnonymous]

export const PANNEL_CREATOR: PannelConfig = ["creator", false]
export const PANNEL_EDITOR: PannelConfig = ["editor", false]
export const PANNEL_DELETER: PannelConfig = ["deleter", false]
export const PANNEL_IMPORTER: PannelConfig = ["importer", false]
export const PANNEL_PROFILE: PannelConfig = ["profile", false]
export const PANNEL_SHORTCUTS: PannelConfig = ["shortcuts", true]

export const PANNELS = [
  PANNEL_CREATOR,
  PANNEL_EDITOR,
  PANNEL_DELETER,
  PANNEL_IMPORTER,
  PANNEL_PROFILE,
  PANNEL_SHORTCUTS,
]

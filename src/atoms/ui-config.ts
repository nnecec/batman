import { atom } from 'jotai'

type UIConfig = {
  height?: number
  width?: number
}

export const uiAtom = atom<UIConfig>({})

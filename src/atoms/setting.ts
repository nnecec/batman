import { atom } from 'jotai'
import { z } from 'zod'

import { Store } from '@tauri-apps/plugin-store'
// when using `"withGlobalTauri": true`, you may use
// const { Store } = window.__TAURI_PLUGIN_STORE__;

// Store will be loaded automatically when used in JavaScript binding.
export const settingStore = new Store('store.settings')

export const settingSchema = z.object({
  accessToken: z.string(),
  host: z.string().url({ message: 'Please provide a valid url as your host.' }),
})

export type Setting = z.infer<typeof settingSchema>

export const settingAtom = atom(
  async () => {
    const data = await settingStore.get<Setting>('gitlab')
    return data
  },
  (get, set, newValue) => {
    settingStore.set('gitlab', newValue)
    return newValue
  },
)

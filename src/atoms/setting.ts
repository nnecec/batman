import { atomWithStorage, createJSONStorage } from 'jotai/utils'
import { z } from 'zod'

import { Store } from '@tauri-apps/plugin-store'
// when using `"withGlobalTauri": true`, you may use
// const { Store } = window.__TAURI_PLUGIN_STORE__;

// Store will be loaded automatically when used in JavaScript binding.
export const settingStore = new Store('setting.bin')

export const settingSchema = z.object({
  accessToken: z.string(),
  host: z.string().url({ message: 'Please provide a valid url as your host.' }),
})

export type Setting = z.infer<typeof settingSchema>

const storage = createJSONStorage(() => {
  return {
    getItem: async (key: string) => await settingStore.get(key),
    removeItem: async (key: string) => {
      await settingStore.delete(key)
    },
    setItem: async (key: string, value: string) => await settingStore.set(key, value),
  }
})

export const settingAtom = atomWithStorage('gitlab', null, storage)

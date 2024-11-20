import { atomWithStorage, createJSONStorage } from 'jotai/utils'
import { z } from 'zod'

import { LazyStore } from '@tauri-apps/plugin-store'
// when using `"withGlobalTauri": true`, you may use
// const { Store } = window.__TAURI_PLUGIN_STORE__;

// Store will be loaded automatically when used in JavaScript binding.
export const settingStore = new LazyStore('setting.bin')

export const settingSchema = z.object({
  accessToken: z.string(),
  host: z
    .string()
    .url({
      message: 'Please provide a valid url as your host.',
    })
    .optional(),
})

export type Setting = z.infer<typeof settingSchema>

const storage = createJSONStorage<null | Setting>(() => {
  return {
    getItem: async (key: string) => {
      const data = await settingStore.get(key)
      return JSON.stringify(data ?? {})
    },
    removeItem: async (key: string) => {
      await settingStore.delete(key)
    },
    setItem: async (key: string, value: string) => {
      await settingStore.set(key, JSON.parse(value))
      await settingStore.save()
    },
  }
})

export const settingAtom = atomWithStorage('gitlab', null, storage)

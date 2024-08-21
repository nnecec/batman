import { Store } from '@tauri-apps/plugin-store'
// when using `"withGlobalTauri": true`, you may use
// const { Store } = window.__TAURI_PLUGIN_STORE__;

// Store will be loaded automatically when used in JavaScript binding.
export const settingStore = new Store('store.settings')

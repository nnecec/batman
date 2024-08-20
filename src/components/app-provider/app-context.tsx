import { useShortcutEvents } from './shortcut-events'

export function AppContext({ children }: { children: React.ReactNode }) {
  useShortcutEvents()

  return children
}

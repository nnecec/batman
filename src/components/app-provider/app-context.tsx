import { useShortcutEvents } from './events/shortcut-events'

export function AppContext({ children }: { children: React.ReactNode }) {
  useShortcutEvents()

  return children
}

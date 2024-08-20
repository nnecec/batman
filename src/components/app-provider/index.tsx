import { AppContext } from './app-context'
import { ThemeProvider } from './theme-provider'
import { Layout } from './layout'

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <AppContext>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Layout>{children}</Layout>
      </ThemeProvider>
    </AppContext>
  )
}

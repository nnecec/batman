import { AppContext } from './app-context'
import { Layout } from './layout'
import { ThemeProvider } from './theme-provider'

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <AppContext>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Layout>{children}</Layout>
      </ThemeProvider>
    </AppContext>
  )
}

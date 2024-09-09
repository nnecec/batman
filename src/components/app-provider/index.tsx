import { Toaster } from '~/components/ui'

import { AppContext } from './app-context'
import { Layout } from './layout'
import { QueryProvider } from './query-provider'
import { ThemeProvider } from './theme-provider'

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <AppContext>
      <QueryProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Layout>{children}</Layout>
          <Toaster />
        </ThemeProvider>
      </QueryProvider>
    </AppContext>
  )
}

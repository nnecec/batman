import { Provider } from 'jotai'

import { store } from '~/atoms'
import { Toaster } from '~/components/ui'

import { AppContext } from './app-context'
import { Layout } from './layout'
import { QueryProvider } from './query-provider'
import { ThemeProvider } from './theme-provider'

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <AppContext>
      <Provider store={store}>
        <QueryProvider>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Layout>{children}</Layout>
            <Toaster />
          </ThemeProvider>
        </QueryProvider>
      </Provider>
    </AppContext>
  )
}

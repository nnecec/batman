import { Outlet } from 'react-router-dom'
import { AppContext } from '~/components/app-context'

import { Layout } from '~/components/layout'
import { ThemeProvider } from '~/components/theme/theme-provider'

export default function App() {
  return (
    <AppContext>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Layout>
          <Outlet />
        </Layout>
      </ThemeProvider>
    </AppContext>
  )
}

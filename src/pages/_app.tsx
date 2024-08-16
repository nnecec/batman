import { Outlet } from 'react-router-dom'

import { Layout } from '~/components/layout'
import { ThemeProvider } from '~/components/theme-provider'

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Layout>
        <Outlet />
      </Layout>
    </ThemeProvider>
  )
}

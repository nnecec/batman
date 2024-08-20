import { Outlet } from 'react-router-dom'

import { AppProvider } from '~/components/app-provider'

export default function App() {
  return (
    <AppProvider>
      <Outlet />
    </AppProvider>
  )
}

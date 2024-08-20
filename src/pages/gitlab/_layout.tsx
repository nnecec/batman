import { Outlet } from 'react-router-dom'

import { Nav } from '~/components/app-provider/nav'

export default function Layout() {
  return (
    <Nav items={[{ title: 'Search', to: '/gitlab/search' }]} title="Gitlab">
      <Outlet />
    </Nav>
  )
}

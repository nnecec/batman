import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'

import { NoMatch } from './common/no-match'
import { PreferencesPage } from './preferences'
import { SearchPage } from './search'

import './app.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />} path="/">
          <Route element={<SearchPage />} index />
          <Route element={<PreferencesPage />} path="/preferences" />
          <Route element={<NoMatch />} path="*" />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

function Layout() {
  return (
    <div className="h-screen select-none">
      <Outlet />
    </div>
  )
}

export default App

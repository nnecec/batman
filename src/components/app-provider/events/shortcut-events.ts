import { listen, UnlistenFn } from '@tauri-apps/api/event'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

type Navigation = {
  to: string
}

export const useShortcutEvents = () => {
  const navigate = useNavigate()
  useEffect(() => {
    let unlisten: UnlistenFn
    listen<Navigation>('navigate', event => {
      navigate(event.payload.to)
    }).then(fn => {
      unlisten = fn
    })
    return () => {
      unlisten?.()
    }
  }, [])
}

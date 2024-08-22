import { ReactNode, useEffect } from 'react'
import { atom, useAtom } from 'jotai'

const titleAtom = atom<string | ReactNode>('')

export const usePageTitle = (newTitle?: string) => {
  const [title, setTitle] = useAtom(titleAtom)
  useEffect(() => {
    if (!newTitle) return
    document.title = newTitle
    setTitle(newTitle)
  }, [newTitle])
  return title
}

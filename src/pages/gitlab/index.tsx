import { useState } from 'react'

import { invoke } from '@tauri-apps/api/core'

import { Button, Input } from '~/components/ui'
import { usePageTitle } from '~/hooks'

export default function Page() {
  usePageTitle('Gitlab')

  const [text, setText] = useState('')
  const handleSearch = () => {
    invoke('fuzzy_search_gitlab', { query: text })
  }

  return (
    <div>
      <div className="flex w-full items-center space-x-2">
        <Input onChange={e => setText(e.target.value)} placeholder="Input query string" value={text} />
        <Button onClick={handleSearch} type="submit">
          Search
        </Button>
      </div>
    </div>
  )
}

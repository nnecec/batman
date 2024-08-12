// When using the Tauri API npm package:
import { invoke } from '@tauri-apps/api/core'

import { Button, Input } from '~/components/ui'

export default function Page() {
  const handleSubmit = () => {
    invoke('fuzzy_search_gitlab', { query: 'test' })
  }
  return (
    <div>
      <Input placeholder="" />
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  )
}

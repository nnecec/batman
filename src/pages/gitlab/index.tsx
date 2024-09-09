import { useState } from 'react'

import { usePageTitle } from '~/atoms'
import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '~/components/ui'

import { useGroups } from './_services'

export default function Page() {
  usePageTitle('Gitlab')

  const [text, setText] = useState('')

  const { data: groups } = useGroups()

  const handleSearch = () => {}

  return (
    <div>
      <div className="flex w-full items-center space-x-2">
        <Select>
          <SelectTrigger className="w-[240px]">
            <SelectValue placeholder="Select a group" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {groups?.map(group => (
                <SelectItem key={group.id} value={group.id}>
                  {group.full_name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input onChange={e => setText(e.target.value)} placeholder="Input query string" value={text} />
        <Button onClick={handleSearch} type="submit">
          Search
        </Button>
      </div>
    </div>
  )
}

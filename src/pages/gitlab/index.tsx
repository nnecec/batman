import { useState } from 'react'

import { usePageTitle } from '~/atoms'
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '~/components/ui'

import { useGroups, useSearchCode } from './_services'

import { z } from 'zod'
import { useForm } from 'react-hook-form'

export const GitlabSearchSchema = z.object({
  group: z.string(),
  search: z.string(),
})

export type GitlabSearch = z.infer<typeof GitlabSearchSchema>

export default function Page() {
  usePageTitle('Gitlab')

  const form = useForm<GitlabSearch>()

  const { data: groups } = useGroups()
  const [search, setSearch] = useState<GitlabSearch>()

  const { data: searchResult } = useSearchCode(search)

  const handleSearch = (values: GitlabSearch) => {
    setSearch(values)
  }

  return (
    <div>
      <div className="flex w-full items-center space-x-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSearch)}>
            <FormField
              control={form.control}
              name="group"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-[240px]">
                        <SelectValue placeholder="Select a group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {groups?.map(group => (
                            <SelectItem key={group.id} value={String(group.id)}>
                              {group.full_name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Input query string" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">Search</Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

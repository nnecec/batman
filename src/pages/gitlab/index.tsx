import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { invoke } from '@tauri-apps/api/core'
import { z } from 'zod'

import { Button, Form, FormControl, FormField, FormItem, FormMessage, Input } from '~/components/ui'
import { usePageTitle } from '~/hooks'

const schema = z.object({
  text: z.string().min(1, { message: 'Please provide a query string.' }),
})

type schemaType = z.infer<typeof schema>

export default function Page() {
  usePageTitle('Gitlab')

  const form = useForm<schemaType>({
    resolver: zodResolver(schema),
  })

  const handleSubmit = (values: schemaType) => {
    invoke('fuzzy_search_gitlab', { query: values.text })
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="flex w-full items-center space-x-2">
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Input query string" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Search</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

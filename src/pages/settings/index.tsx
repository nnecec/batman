import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { settingStore } from '~/components/tauri/store'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  useToast,
} from '~/components/ui'
import { Button } from '~/components/ui/button'
import { usePageTitle } from '~/hooks'
import { useEffect } from 'react'

const schema = z.object({
  accessToken: z.string(),
  host: z.string().url({ message: 'Please provide a valid url as your host.' }),
})

type SettingsType = z.infer<typeof schema>

export default function Page() {
  usePageTitle('Settings')
  const { toast } = useToast()

  const form = useForm<SettingsType>({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    settingStore.get<SettingsType>('gitlab').then(data => {
      data && form.reset(data)
    })
  }, [])

  function onSubmit(values: SettingsType) {
    settingStore
      .set('gitlab', {
        accessToken: values.accessToken,
        host: values.host,
      })
      .then(
        () => {
          toast({ title: 'Saved successfully!' })
        },
        () => {
          toast({ title: 'Failed to save!' })
        },
      )
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card x-chunk="settings-gitlab">
            <CardHeader>
              <CardTitle>Gitlab settings</CardTitle>
              <CardDescription>Used to access your Gitlab account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="host"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Host</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="https://example.gitlab.com" />
                    </FormControl>
                    <FormDescription>This is your gitlab host, such as self-hosted gitlab.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="accessToken"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Access token</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>The accessToken at least have read permission..</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button>Save</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  )
}

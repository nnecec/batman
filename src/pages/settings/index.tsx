import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useAtom } from 'jotai'

import { Setting, settingAtom, settingSchema, usePageTitle } from '~/atoms'
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

export default function Page() {
  usePageTitle('Settings')
  const { toast } = useToast()
  const form = useForm<Setting>({
    resolver: zodResolver(settingSchema),
  })
  const [setting, setSetting] = useAtom(settingAtom)

  useEffect(() => {
    if (setting) form.reset(setting)
  }, [form, setting])

  function onSubmit(values: Setting) {
    setSetting({
      accessToken: values.accessToken,
      host: values.host || 'https://www.gitlab.com',
    })
    toast({
      description: 'Your settings has been saved.',
      title: 'Saved!',
    })
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
                    <FormDescription>
                      Optional configure your self-hosted gitlab. Official gitlab as host is default.
                    </FormDescription>
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

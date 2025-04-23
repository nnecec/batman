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
} from '~/components/ui'
import { Button } from '~/components/ui/button'
import { toast } from 'sonner'

export default function Page() {
  usePageTitle('Settings')
  const [setting, setSetting] = useAtom(settingAtom)
  const form = useForm<Setting>({
    resolver: zodResolver(settingSchema),
    values: setting ?? { accessToken: '', host: 'https://www.gitlab.com' },
  })

  function onSubmit(values: Setting) {
    setSetting({
      accessToken: values.accessToken,
      host: values.host,
    })
    toast('Saved!', { description: 'Your settings has been saved.' })
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
                      <Input {...field} placeholder="https://www.gitlab.com" />
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
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormDescription>
                      The accessToken at least has <span className="font-bold text-foreground">read_api</span> or{' '}
                      <span className="font-bold text-foreground">api</span> permission.
                    </FormDescription>
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

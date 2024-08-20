import { Button } from '~/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card'
import { Checkbox } from '~/components/ui/checkbox'
import { Input } from '~/components/ui/input'
import { usePageTitle } from '~/hooks'

export default function Page() {
  usePageTitle('Preferences')

  return (
    <div className="flex w-full flex-col gap-4">
      <Card x-chunk="dashboard-04-chunk-1">
        <CardHeader>
          <CardTitle>Store Name</CardTitle>
          <CardDescription>Used to identify your store in the marketplace.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <Input placeholder="Store Name" />
          </form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>Save</Button>
        </CardFooter>
      </Card>
      <Card x-chunk="dashboard-04-chunk-2">
        <CardHeader>
          <CardTitle>Plugins Directory</CardTitle>
          <CardDescription>The directory within your project, in which your plugins are located.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4">
            <Input defaultValue="/content/plugins" placeholder="Project Name" />
            <div className="flex items-center space-x-2">
              <Checkbox defaultChecked id="include" />
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="include"
              >
                Allow administrators to change the directory.
              </label>
            </div>
          </form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>Save</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

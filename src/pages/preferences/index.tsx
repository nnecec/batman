import { Link } from 'react-router-dom'

import { CubeIcon, GearIcon, HamburgerMenuIcon, MagnifyingGlassIcon, PersonIcon } from '@radix-ui/react-icons'

import { Button } from '~/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card'
import { Checkbox } from '~/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { Input } from '~/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '~/components/ui/sheet'

export default function Page() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link className="flex items-center gap-2 text-lg font-semibold md:text-base" to="#">
            <GearIcon className="size-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <Link className="text-muted-foreground transition-colors hover:text-foreground" to="#">
            Dashboard
          </Link>
          <Link className="text-muted-foreground transition-colors hover:text-foreground" to="#">
            Orders
          </Link>
          <Link className="text-muted-foreground transition-colors hover:text-foreground" to="#">
            Products
          </Link>
          <Link className="text-muted-foreground transition-colors hover:text-foreground" to="#">
            Customers
          </Link>
          <Link className="text-foreground transition-colors hover:text-foreground" to="#">
            Settings
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="shrink-0 md:hidden" size="icon" variant="outline">
              <HamburgerMenuIcon className="size-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link className="flex items-center gap-2 text-lg font-semibold" to="#">
                <CubeIcon className="size-6" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              <Link className="text-muted-foreground hover:text-foreground" to="#">
                Dashboard
              </Link>
              <Link className="text-muted-foreground hover:text-foreground" to="#">
                Orders
              </Link>
              <Link className="text-muted-foreground hover:text-foreground" to="#">
                Products
              </Link>
              <Link className="text-muted-foreground hover:text-foreground" to="#">
                Customers
              </Link>
              <Link className="hover:text-foreground" to="#">
                Settings
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
              <Input
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                placeholder="Search products..."
                type="search"
              />
            </div>
          </form>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="rounded-full" size="icon" variant="secondary">
                <PersonIcon className="size-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav className="grid gap-4 text-sm text-muted-foreground">
            <Link className="font-semibold text-primary" to="#">
              General
            </Link>
            <Link to="#">Security</Link>
            <Link to="#">Integrations</Link>
            <Link to="#">Support</Link>
            <Link to="#">Organizations</Link>
            <Link to="#">Advanced</Link>
          </nav>
          <div className="grid gap-6">
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
        </div>
      </main>
    </div>
  )
}

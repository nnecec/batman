import { Link } from 'react-router-dom'

import { CubeIcon, GearIcon, HamburgerMenuIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons'

import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '~/components/ui/sheet'

import { ThemeToggle } from '../theme-toggle'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen select-none">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link className="flex items-center gap-2 text-lg font-semibold md:text-base" to="#">
            <GearIcon className="size-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <Link className="text-muted-foreground transition-colors hover:text-foreground" to="/gitlab">
            Gitlab
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
          <ThemeToggle />
        </div>
      </header>
      {children}
    </div>
  )
}

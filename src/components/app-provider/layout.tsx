import { CubeIcon, GearIcon, HamburgerMenuIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons'

import { Button } from '~/components/ui/button'

import { ThemeToggle } from './theme-toggle'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~/components/ui/tooltip'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid h-screen w-full pl-[53px] select-none">
      <TooltipProvider>
        <aside className="inset-y fixed left-0 z-20 flex h-full flex-col border-r" data-tauri-drag-region>
          <div className="border-b p-2">
            <Button variant="outline" size="icon" aria-label="Home">
              <CubeIcon className="size-5 fill-foreground" />
            </Button>
          </div>
          <nav className="grid gap-1 p-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-lg bg-muted" aria-label="Playground">
                  <HamburgerMenuIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Playground
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-lg" aria-label="Models">
                  <GearIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Models
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-lg" aria-label="Settings">
                  <MagnifyingGlassIcon className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Settings
              </TooltipContent>
            </Tooltip>
          </nav>
          <nav className="mt-auto grid gap-1 p-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="mt-auto rounded-lg" aria-label="Help">
                  <MagnifyingGlassIcon className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                <ThemeToggle />
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="mt-auto rounded-lg" aria-label="Account">
                  <MagnifyingGlassIcon className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Account
              </TooltipContent>
            </Tooltip>
          </nav>
        </aside>

        <main className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">{children}</main>
      </TooltipProvider>
    </div>
  )
}

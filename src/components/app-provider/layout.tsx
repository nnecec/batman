import { DotsHorizontalIcon, GearIcon } from '@radix-ui/react-icons'

import { Button } from '~/components/ui/button'

import { ThemeToggle } from './theme-toggle'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~/components/ui/tooltip'
import { GitlabIcon } from '../icons/gitlab'
import { useNavigate } from '~/router'
import { usePageTitle } from '~/hooks'

export function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()

  const title = usePageTitle()
  return (
    <div className="grid h-screen w-full pl-[69px] select-none">
      <TooltipProvider>
        <aside data-tauri-drag-region className="inset-y fixed left-0 z-20 flex h-full flex-col pt-5 border-r">
          <nav className="grid gap-2 p-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg"
                  aria-label="Gitlab"
                  onClick={() => navigate('/gitlab')}
                >
                  <GitlabIcon className="size-6" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={10}>
                Gitlab
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-lg" aria-label="Settings">
                  <DotsHorizontalIcon className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={10}>
                Coming soon...
              </TooltipContent>
            </Tooltip>
          </nav>
          <nav className="mt-auto grid gap-1 p-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="mt-auto rounded-lg" aria-label="ThemeToggle">
                  <ThemeToggle />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={10}>
                Theme
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="mt-auto rounded-lg"
                  aria-label="Preferences"
                  onClick={() => navigate('/preferences')}
                >
                  <GearIcon className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={10}>
                Preferences
              </TooltipContent>
            </Tooltip>
          </nav>
        </aside>

        <main className="flex flex-col" id="content">
          <div className="h-8" data-tauri-drag-region></div>
          <div className="min-h-screen p-4 md:gap-8 md:p-10 mx-auto w-full max-w-6xl">
            <div className="mb-6">
              <h1 className="text-4xl font-semibold">{title}</h1>
            </div>
            <div>{children}</div>
          </div>
        </main>
      </TooltipProvider>
    </div>
  )
}

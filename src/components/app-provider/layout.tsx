import { DotsHorizontalIcon, GearIcon } from '@radix-ui/react-icons'

import { usePageTitle } from '~/atoms'
import { Button } from '~/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~/components/ui/tooltip'
import { useNavigate } from '~/router'
import { cn } from '~/utils'

import { GitlabIcon } from '../icons/gitlab'
import { DotPattern } from '../ui'
import { ThemeToggle } from './theme-toggle'

export function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()

  const title = usePageTitle()

  return (
    <div className="grid h-screen w-full select-none pl-[69px]">
      <TooltipProvider>
        <aside className="fixed left-0 z-20 flex h-full flex-col border-r pt-5" data-tauri-drag-region>
          <nav className="grid gap-2 p-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  aria-label="Gitlab"
                  className="rounded-lg"
                  onClick={() => navigate('/gitlab')}
                  size="icon"
                  variant="ghost"
                >
                  <GitlabIcon className="size-8" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={10}>
                Gitlab
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button aria-label="Settings" className="rounded-lg" size="icon" variant="ghost">
                  <DotsHorizontalIcon className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={10}>
                Coming soon...
              </TooltipContent>
            </Tooltip>
          </nav>
          <nav className="mt-auto grid gap-1 p-4">
            <ThemeToggle />
            <Button
              aria-label="Settings"
              className="mt-auto rounded-lg"
              onClick={() => navigate('/settings')}
              size="icon"
              variant="ghost"
            >
              <GearIcon className="size-5" />
            </Button>
          </nav>
        </aside>

        <main className="flex min-h-screen flex-col overflow-y-auto">
          <div className="absolute inset-x-0 top-0 h-8" data-tauri-drag-region />
          <div className="mx-auto w-full max-w-6xl flex-1 grow p-6 md:gap-8 md:p-10">
            <div className="mb-6">
              <h1 className="text-4xl font-semibold">{title}</h1>
            </div>
            <div className="min-h-[50vh]">{children}</div>
          </div>
          <div className="h-[300px] shrink-0 overflow-hidden">
            <div className="relative flex h-[500px] w-full shrink-0 flex-col items-center justify-center overflow-hidden rounded-lg bg-background pr-[69px] md:shadow-xl">
              <DotPattern className={cn('[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]')} />
            </div>
          </div>
        </main>
      </TooltipProvider>
    </div>
  )
}

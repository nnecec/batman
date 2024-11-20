import { useAtom } from 'jotai'

import { ExternalLinkIcon, UpdateIcon } from '@radix-ui/react-icons'
import { Command } from '@tauri-apps/plugin-shell'

import { usePageTitle } from '~/atoms'
import { gitlabGroupIdAtom, gitlabInputAtom, gitlabProjectIdAtom, gitlabSearchAtom } from '~/atoms/gitlab'
import { Code } from '~/components/code'
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  Input,
  Label,
  RadioGroup,
  RadioGroupItem,
  ScrollArea,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui'

import { CardSkeleton, RadioSkeleton } from './_components/list-skeleton'
import { useGroups, useProjectsAutoQuery, useSearchInProject } from './_services'

async function handleOpenFile(url: string) {
  await Command.create('open', [url]).execute()
}

export default function Page() {
  usePageTitle('Gitlab')

  const [groupId, setGroupId] = useAtom(gitlabGroupIdAtom)
  const [projectId, setProjectId] = useAtom(gitlabProjectIdAtom)
  const [input, setInput] = useAtom(gitlabInputAtom)
  const [search, setSearch] = useAtom(gitlabSearchAtom)
  const { data: groups, isLoading: isGroupsLoading } = useGroups()

  const {
    data: searchResult,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isSearchResultLoading,
  } = useSearchInProject({ projectId, search })

  const {
    data: projects,
    isLoading: isProjectsLoading,
    fetchNextPage: fetchNextPatchProjects,
    hasNextPage: hasNextPatchProjects,
  } = useProjectsAutoQuery({ groupId, search })
  const currentProject = projects?.find(project => project.id === Number(projectId))

  function handleSearch() {
    setSearch(input)
  }

  return (
    <div className="space-y-3">
      <div className="flex">
        <div className="flex flex-col w-[150px] shrink-0 p-2 sticky top-6">
          <Select
            onValueChange={value => {
              setGroupId(value)
              setProjectId('')
              setSearch('')
            }}
            value={groupId}
          >
            <SelectTrigger className="w-full shrink-0 bg-background">
              <SelectValue placeholder="Select a group" />
            </SelectTrigger>
            <SelectContent>
              {isGroupsLoading ?
                <div className="flex items-center justify-center py-4">
                  <UpdateIcon className="animate-spin" />
                </div>
              : <SelectGroup>
                  {groups?.map(group => (
                    <SelectItem key={group.id} value={String(group.id)}>
                      {group.full_name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              }
            </SelectContent>
          </Select>
          {projects?.length && projects?.length > 0 ?
            <ScrollArea className="h-[50vh] w-full rounded-md shrink-0 p-3 sticky top-6">
              <RadioGroup value={projectId} onValueChange={value => setProjectId(value)}>
                <div className="space-y-2">
                  {projects.map(project => (
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={String(project.id)} id={String(project.id)} />
                      <Label htmlFor={String(project.id)}>{project.name}</Label>
                    </div>
                  ))}
                  {isProjectsLoading ? Array.from({ length: 3 }).map((_, i) => <RadioSkeleton key={i} />) : null}
                  {hasNextPatchProjects ?
                    <Button onClick={() => fetchNextPatchProjects()} size="sm">
                      Load more
                    </Button>
                  : null}
                </div>
              </RadioGroup>
            </ScrollArea>
          : null}
        </div>
        <div className="p-2 grow space-y-3 overflow-hidden min-w-0">
          <div className="flex gap-3">
            <Input
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  handleSearch()
                }
              }}
              placeholder="Input query string"
              value={input}
              className="grow"
              disabled={!groupId}
            />
            <Button onClick={handleSearch} disabled={isSearchResultLoading}>
              Search
            </Button>
          </div>

          {isSearchResultLoading ?
            Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)
          : searchResult && searchResult.pages.length > 0 ?
            <>
              {searchResult.pages.map((page: any) =>
                page.map((item: any) => {
                  return (
                    <Card key={item.path + item.id + item.startline}>
                      <CardHeader>
                        <CardDescription
                          className="cursor-pointer text-pretty"
                          onClick={() => {
                            void handleOpenFile(
                              `${currentProject?.web_url}/-/blob/${currentProject?.default_branch}/${item.path}#L${item.startline}`,
                            )
                          }}
                        >
                          {item.path} <ExternalLinkIcon className="inline-block" />
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Code text={item.data} />
                      </CardContent>
                    </Card>
                  )
                }),
              )}

              {isFetchingNextPage ? Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />) : null}
              {hasNextPage ?
                <div className="flex justify-center">
                  <Button onClick={() => fetchNextPage()}>Load more</Button>
                </div>
              : null}
            </>
          : searchResult?.pages?.length === 0 ?
            <div className="items-center justify-center pt-20">
              <div className="flex flex-col items-center gap-1 text-center">
                <h3 className="text-2xl font-bold tracking-tight">There has No matching results.</h3>
                <p className="text-sm text-muted-foreground">
                  You can change a project or query content and try again.
                </p>
              </div>
            </div>
          : null}
        </div>
      </div>
    </div>
  )
}

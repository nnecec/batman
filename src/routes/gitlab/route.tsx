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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  ScrollArea,
} from '~/components/ui'

import { CardSkeleton } from './_components/list-skeleton'
import { useGroups, useProjectsBySearch, useSearchInProject } from './_components/services'

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
    data: projectsData,
    isFetching: isProjectsFetching,
    fetchNextPage: fetchNextPatchProjects,
    hasNextPage: hasNextPatchProjects,
  } = useProjectsBySearch({ groupId, search })
  const currentProject = {}

  function handleSearch() {
    if (input.length < 3) return
    setSearch(input)
  }

  return (
    <div className="space-y-3">
      <div className="flex">
        <div className="flex flex-col w-[180px] shrink-0 p-2 gap-3">
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

          {projectsData?.pages && projectsData.pages?.length > 0 ?
            <ScrollArea className="max-h-[60vh] w-full rounded-md p-3 sticky">
              <RadioGroup value={projectId} onValueChange={value => setProjectId(value)}>
                <div className="space-y-2">
                  {projectsData.pages.map(projects =>
                    projects.filter(Boolean).map(project => (
                      <div className="flex items-center space-x-2" key={project.id}>
                        <RadioGroupItem value={String(project.id)} id={String(project.id)} />
                        <Label htmlFor={String(project.id)}>{project.name}</Label>
                      </div>
                    )),
                  )}
                </div>
              </RadioGroup>
            </ScrollArea>
          : null}
          {hasNextPatchProjects ?
            <Button onClick={() => fetchNextPatchProjects()} size="sm" disabled={isProjectsFetching}>
              {isProjectsFetching ?
                <UpdateIcon className="animate-spin" />
              : 'Load more'}
            </Button>
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
              placeholder="Input query string, at least 3 characters"
              value={input}
              className="grow"
              disabled={!groupId}
              minLength={3}
            />
            <Button onClick={handleSearch} disabled={isSearchResultLoading || input.length < 3}>
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
                        <Code text={item.data} highlightRaw={input} />
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

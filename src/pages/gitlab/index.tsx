import { useAtom } from 'jotai'

import { usePageTitle } from '~/atoms'
import { gitlabGroupIdAtom, gitlabInputAtom, gitlabProjectIdAtom, gitlabSearchAtom } from '~/atoms/gitlab'
import { Code } from '~/components/code'
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tabs,
  TabsList,
  TabsTrigger,
} from '~/components/ui'

import { useGroups, useProjectsByGroupId, useSearchInProject } from './_services'

export default function Page() {
  usePageTitle('Gitlab')

  const [groupId, setGroupId] = useAtom(gitlabGroupIdAtom)
  const [projectId, setProjectId] = useAtom(gitlabProjectIdAtom)
  const [input, setInput] = useAtom(gitlabInputAtom)
  const [search, setSearch] = useAtom(gitlabSearchAtom)
  const { data: groups } = useGroups()
  const { data: projects } = useProjectsByGroupId(groupId)

  const { data: searchResult } = useSearchInProject({ projectId, search })
  console.log(searchResult)

  function handleSearch() {
    setSearch(input)
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Select
          onValueChange={value => {
            setGroupId(value)
            setProjectId('')
            setSearch('')
          }}
          value={groupId}
        >
          <SelectTrigger className="w-[220px] flex-initial">
            <SelectValue placeholder="Select a group" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {groups?.map(group => (
                <SelectItem key={group.id} value={String(group.id)}>
                  {group.full_name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {projects?.length && projects?.length > 0 ?
          <Tabs
            className="flex-1 overflow-x-auto"
            onValueChange={value => {
              setProjectId(value)
            }}
            value={projectId}
          >
            <TabsList>
              {projects.map(project => (
                <TabsTrigger key={project.id} value={String(project.id)}>
                  {project.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        : null}
      </div>

      {!!groupId && !!projectId && (
        <div className="flex gap-2">
          <Input
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleSearch()
              }
            }}
            placeholder="Input query string"
            value={input}
          />
          <Button onClick={handleSearch}>Search</Button>
        </div>
      )}

      {searchResult?.map(item => (
        <Card key={item.path + item.id + item.startline}>
          <CardHeader>
            <CardDescription>{item.filename}</CardDescription>
          </CardHeader>
          <CardContent>
            <Code content={item.data} />
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button>Open in default browser</Button>
            <Button>Open in VSCode</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

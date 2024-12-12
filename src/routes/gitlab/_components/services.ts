import { ProjectSchema } from '@gitbeaker/core'
import { useInfiniteQuery, useQueries, useQuery } from '@tanstack/react-query'

import { useGitlabApi } from '~/utils'

export const useGroups = () => {
  const gitlab = useGitlabApi()

  return useQuery({
    enabled: !!gitlab,
    queryFn: () => gitlab?.Groups.all({ topLevelOnly: true }),
    queryKey: ['groups'],
  })
}

export const useProjectsByGroupId = ({ groupId, search }: { groupId: string; search: string }) => {
  const gitlab = useGitlabApi()

  return useInfiniteQuery<any, any, any, any, number>({
    enabled: !!search && !!gitlab && !!groupId,
    getNextPageParam: (lastPage, _, lastPageParam) => (lastPage.length < 10 ? undefined : lastPageParam + 1),
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      gitlab?.Groups.allProjects(groupId!, {
        orderBy: 'last_activity_at',
        simple: true,
        sort: 'desc',
        perPage: 20,
        maxPages: 1,
        page: pageParam,
      }),
    queryKey: ['groups', groupId, 'projects', search],
    retryOnMount: false,
  })
}

export const useProjectsAutoQuery = ({ groupId, search }: { groupId: string; search: string }) => {
  const gitlab = useGitlabApi()
  const { data, isLoading: isProjectsLoading, hasNextPage, fetchNextPage } = useProjectsByGroupId({ groupId, search })

  const projects = data?.pages.flat(9)

  const matchedProjectsQueries = useQueries({
    queries:
      groupId && projects && search ?
        projects.map((project: any) => {
          return {
            queryKey: ['search', project.id, search],
            queryFn: async () => {
              /** @ts-ignore */
              const res = await gitlab?.Search.all('blobs', search, {
                page: 1,
                perPage: 1,
                projectId: project.id,
                groupId,
                search,
              })

              if (res?.length && res?.length > 0) {
                return project
              }

              return null
            },
          }
        })
      : [],
  })

  return {
    data: matchedProjectsQueries.filter(query => query.data).map(query => query.data!) as ProjectSchema[],
    isLoading: isProjectsLoading || matchedProjectsQueries.some(query => query.isLoading),
    hasNextPage,
    fetchNextPage,
  }
}

export const useSearchInProject = ({ projectId, search }: { projectId: string; search: string }) => {
  const gitlab = useGitlabApi()

  return useInfiniteQuery<any, any, any, any, any>({
    enabled: !!search && !!gitlab && !!projectId,
    getNextPageParam: (lastPage, _, lastPageParam) => (lastPage.length < 10 ? undefined : lastPageParam + 1),
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      gitlab?.Search.all('blobs', search, {
        page: pageParam,
        perPage: 10,
        projectId,
      }),
    queryKey: ['search', projectId, search],
    retryOnMount: false,
  })
}

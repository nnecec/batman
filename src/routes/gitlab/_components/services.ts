import { InfiniteData, useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'

import { useGitlabApi } from '~/lib/api'

export const useGroups = () => {
  const gitlab = useGitlabApi()

  return useQuery({
    enabled: !!gitlab,
    queryFn: () => gitlab?.Groups.all({ topLevelOnly: true }),
    queryKey: ['groups'],
  })
}

const PageSize = 8
export const useProjectsBySearch = ({ groupId, search }: { groupId: string; search: string }) => {
  const gitlab = useGitlabApi()
  const leftTimes = useRef(PageSize)

  const query = useInfiniteQuery<any[], any, InfiniteData<any[]>, any, number>({
    enabled: !!search && !!gitlab && !!groupId,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      return lastPage.length < PageSize ? undefined : lastPageParam + 1
    },
    initialPageParam: 1,
    retry: 0,
    queryFn: async ({ pageParam }) => {
      const projects =
        (await gitlab?.Groups.allProjects(groupId!, {
          orderBy: 'last_activity_at',
          simple: true,
          sort: 'desc',
          perPage: PageSize,
          maxPages: 1,
          page: pageParam,
        })) ?? []
      const results = await Promise.all(
        projects.map(async project => {
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
        }),
      )
      return results
    },
    queryKey: ['groups', groupId, 'projects', search],
    retryOnMount: false,
  })

  useEffect(() => {
    if (leftTimes.current > 0) {
      const len = query.data?.pages?.at(-1)?.filter(Boolean)?.length || 1
      if (len < PageSize && query.hasNextPage) {
        leftTimes.current -= len
        query.fetchNextPage()
      }
    } else {
      leftTimes.current = PageSize
    }
  }, [query.data?.pages?.length])

  return query
}

export const useSearchInProject = ({ projectId, search }: { projectId: string; search: string }) => {
  const gitlab = useGitlabApi()

  return useInfiniteQuery<any, any, any, any, any>({
    enabled: !!search && !!gitlab && !!projectId,
    getNextPageParam: (lastPage, _, lastPageParam) => (lastPage.length < PageSize ? undefined : lastPageParam + 1),
    initialPageParam: 1,
    queryFn: ({ pageParam }) => gitlab?.Search.all('blobs', search, { page: pageParam, perPage: PageSize, projectId }),
    queryKey: ['search', projectId, search],
    retryOnMount: false,
  })
}

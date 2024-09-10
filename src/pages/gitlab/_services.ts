import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'

import { useGitlabApi } from '~/utils'

export const useGroups = () => {
  const gitlab = useGitlabApi()

  return useQuery({
    enabled: !!gitlab,
    queryFn: () => gitlab?.Groups.all({ topLevelOnly: true }),
    queryKey: ['groups'],
  })
}

export const useProjectsByGroupId = (groupId?: string) => {
  const gitlab = useGitlabApi()

  return useQuery({
    enabled: !!gitlab && !!groupId,
    queryFn: () =>
      gitlab?.Groups.allProjects(groupId, {
        maxPages: 1,
        orderBy: 'last_activity_at',
        simple: true,
        sort: 'desc',
      }),
    queryKey: ['groups', groupId, 'projects'],
  })
}

export const useSearchInProject = ({ projectId, search }: { projectId: string; search: string }) => {
  const gitlab = useGitlabApi()

  return useQuery({
    enabled: !!search && !!gitlab && !!projectId,
    queryFn: () =>
      gitlab?.Search.all('blobs', search, {
        maxPages: 1,
        projectId: projectId,
      }),
    queryKey: ['search', projectId, search],
  })
}

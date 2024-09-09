import { useQuery } from '@tanstack/react-query'

import { useGitlabApi } from '~/utils'

export const useGroups = () => {
  const gitlab = useGitlabApi()

  return useQuery({
    enabled: !!gitlab,
    queryFn: () => gitlab?.Groups.all(),
    queryKey: ['groups'],
  })
}

export const useSearchCode = (query?: { group: string; search: string }) => {
  const gitlab = useGitlabApi()

  return useQuery({
    enabled: !!gitlab && !!query,
    queryFn: () =>
      gitlab?.Search.all('blobs', query.search, {
        groupId: query.group,
      }),
    queryKey: ['snippets'],
  })
}

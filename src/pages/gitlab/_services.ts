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

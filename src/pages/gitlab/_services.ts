import { useQuery } from '@tanstack/react-query'

export const useGroups = () => {
  return useQuery({
    queryFn: async () => {},
    queryKey: ['groups'],
  })
}

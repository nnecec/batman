import { matchQuery, MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { toast } from '../ui'

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError(error) {
        toast({
          description: error.message,
          title: error.name,
        })
      },
      onSuccess() {
        toast({
          title: 'Success',
        })
      },
      retry: 0,
    },
    queries: {
      refetchOnMount: true,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      retry: false,
      retryOnMount: true,
    },
  },
  mutationCache: new MutationCache({
    onSuccess(_, __, ___, mutation) {
      if (mutation.meta?.invalidates) {
        queryClient.invalidateQueries({
          predicate: query => mutation.meta?.invalidates?.some(queryKey => matchQuery({ queryKey }, query)) ?? true,
        })
      }
    },
  }),
  queryCache: new QueryCache({
    onError(error) {
      if (error.cause) {
        if ((error.cause as any).response?.status === 401) {
          toast({
            description: 'Please check your GitLab access token',
            title: 'Unauthorized',
          })
        }
        return
      }

      toast({
        description: error.message,
        title: error.name,
      })
    },
  }),
})

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

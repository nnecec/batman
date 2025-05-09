import { matchQuery, MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { toast } from 'sonner'

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError(error) {
        toast.message(error.name, { description: error.message })
      },
      onSuccess() {
        toast.success('Success')
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
          toast.message('Unauthorized', { description: 'Please check your GitLab access token' })
        } else if ((error.cause as any).response?.status === 403) {
          toast.message('Forbidden', { description: 'The request requires higher privileges than provided by the access token. You should give api or read_api permission.' })
        }
        return
      }

      toast.message(error.name, { description: error.message })
    },
  }),
})

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

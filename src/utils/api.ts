import { useMemo } from 'react'

import { useAtomValue } from 'jotai'

import { Gitlab } from '@gitbeaker/rest'

import { settingAtom } from '~/atoms'
import { useToast } from '~/components/ui'

export const useGitlabApi = () => {
  const setting = useAtomValue(settingAtom)
  const { toast } = useToast()

  return useMemo(() => {
    if (setting) {
      if (setting.accessToken && setting.host) {
        const api = new Gitlab({
          host: setting.host,
          queryTimeout: 10_000,
          token: setting.accessToken,
        })
        return api
      }
      toast({
        description: 'Please configure GitLab in settings',
        title: 'No GitLab settings',
      })

      return null
    }

    return null
  }, [setting])
}

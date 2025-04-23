import { useMemo } from 'react'

import { useAtomValue } from 'jotai'

import { Gitlab } from '@gitbeaker/rest'

import { settingAtom } from '~/atoms'
import { toast } from 'sonner'

export const useGitlabApi = () => {
  const setting = useAtomValue(settingAtom)

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
      toast.message('No GitLab configuration', {description: 'Please complete GitLab configuration in the settings'})

      return null
    }

    return null
  }, [setting])
}

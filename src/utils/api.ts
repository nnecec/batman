import { useMemo } from 'react'

import { useAtomValue } from 'jotai'

import { Gitlab } from '@gitbeaker/rest'

import { settingAtom } from '~/atoms'

export const useGitlabApi = () => {
  const setting = useAtomValue(settingAtom)

  return useMemo(() => {
    if (setting?.accessToken && setting?.host) {
      const api = new Gitlab({
        host: setting?.host,
        token: setting?.accessToken,
      })
      return api
    }
    return null
  }, [setting?.accessToken, setting?.host])
}

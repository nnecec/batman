import { useState } from 'react'

import { useAsyncEffect } from '@reactuses/core'

import { codeToHtml } from 'shiki'

export function Code({ text }: { text: string }) {
  const [content, setContent] = useState<null | string>(null)

  useAsyncEffect(
    async () => {
      const html = await codeToHtml(text, {
        lang: 'javascript',
        themes: {
          light: 'vitesse-light',
          dark: 'vitesse-dark',
        },
      })
      setContent(html)
    },
    undefined,
    [text],
  )

  return (
    <div
      className="block font-mono text-sm"
      dangerouslySetInnerHTML={{
        __html: content || '',
      }}
    ></div>
  )
}

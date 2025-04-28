import { useState } from 'react'

import { useAsyncEffect } from '@reactuses/core'

import { codeToHtml } from 'shiki'
import { transformerMetaWordHighlight } from '@shikijs/transformers'

export function Code({ text, highlightRaw }: { text: string; highlightRaw?: string }) {
  const [content, setContent] = useState<null | string>(null)

  useAsyncEffect(
    async () => {
      const html = await codeToHtml(text, {
        lang: 'javascript',
        themes: { light: 'vitesse-light', dark: 'vitesse-dark' },
        transformers: [transformerMetaWordHighlight()],
        meta: { __raw: `/${highlightRaw}/` },
      })
      setContent(html)
    },
    undefined,
    [text, highlightRaw],
  )

  return <div className="block font-mono text-sm" dangerouslySetInnerHTML={{ __html: content || '' }}></div>
}

// 样式示例：请在全局或组件 CSS 文件中加入
// .highlight-raw { background: yellow; color: inherit; border-radius: 2px; padding: 0 2px; }

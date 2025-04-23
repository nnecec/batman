import { useState } from 'react'

import { useAsyncEffect } from '@reactuses/core'

import { codeToHtml } from 'shiki'
import { transformerMetaHighlight } from '@shikijs/transformers'

export function Code({ text, highlightRaw }: { text: string, highlightRaw?: string }) {
  const [content, setContent] = useState<null | string>(null)

  useAsyncEffect(
    async () => {
      // 计算需要高亮的行号
      let highlightLines: number[] = []
      if (highlightRaw) {
        highlightLines = text.split('\n').map((line, idx) => {
          return line.includes(highlightRaw) ? idx + 1 : -1
        }).filter(i => i > 0)
      }
      const meta: Record<string, string> = {}
      if (highlightLines.length > 0) {
        meta.__raw = `{${highlightLines.join(',')}}`
      }
      const html = await codeToHtml(text, {
        lang: 'javascript',
        themes: {
          light: 'vitesse-light',
          dark: 'vitesse-dark',
        },
        transformers: [
          transformerMetaHighlight(),
        ],
        meta
      })
      setContent(html)
    },
    undefined,
    [text, highlightRaw],
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

// 样式示例：请在全局或组件 CSS 文件中加入
// .highlight-raw { background: yellow; color: inherit; border-radius: 2px; padding: 0 2px; }

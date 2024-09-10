import { useState } from 'react'

import rehypeStringify from 'rehype-stringify'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'

import { useAsyncEffect } from '@reactuses/core'
import rehypeShiki from '@shikijs/rehype'

const transform = async (content: string) => {
  return await unified()
    .use(remarkRehype)
    .use(rehypeShiki, {
      // or `theme` for a single theme
      themes: {
        dark: 'vitesse-dark',
        light: 'vitesse-light',
      },
    })
    .use(rehypeStringify)
    .process(content)
}

export function Code({ content }: { content: string }) {
  const [transformContent, setTransformContent] = useState<any>()

  // useAsyncEffect(
  //   async () => {
  //     const res = await transform(content)
  //     console.log(res)

  //     // setTransformContent(res.toString())
  //   },
  //   undefined,
  //   [content],
  // )

  return <div>{content}</div>
}

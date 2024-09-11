import { useEffect, useState } from 'react'

import hljs from 'highlight.js'

import 'highlight.js/styles/nord.css'

export function Code({ text }: { text: string }) {
  const [content, setContent] = useState<null | string>(null)
  useEffect(() => {
    setContent(hljs.highlightAuto(text, ['javascript', 'typescript']).value)
  }, [text])

  return (
    <pre className="overflow-auto rounded-md bg-muted p-4 font-mono text-sm">
      <code
        dangerouslySetInnerHTML={{
          __html: content || '',
        }}
      />
    </pre>
  )
}

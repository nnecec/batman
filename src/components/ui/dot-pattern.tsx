import { useId } from 'react'

import { cn } from '~/utils'

interface DotPatternProps {
  [key: string]: any
  className?: string
  cr?: any
  cx?: any
  cy?: any
  height?: any
  width?: any
  x?: any
  y?: any
}
export function DotPattern({
  className,
  cr = 1,
  cx = 1,
  cy = 1,
  height = 16,
  width = 16,
  x = 0,
  y = 0,
  ...props
}: DotPatternProps) {
  const id = useId()

  return (
    <svg
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 h-full w-full fill-neutral-400/80', className)}
      {...props}
    >
      <defs>
        <pattern
          height={height}
          id={id}
          patternContentUnits="userSpaceOnUse"
          patternUnits="userSpaceOnUse"
          width={width}
          x={x}
          y={y}
        >
          <circle cx={cx} cy={cy} id="pattern-circle" r={cr} />
        </pattern>
      </defs>
      <rect fill={`url(#${id})`} height="100%" strokeWidth={0} width="100%" />
    </svg>
  )
}

export default DotPattern

import { Card, CardContent, CardDescription, CardHeader, Skeleton } from '~/components/ui'

export const CardSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <CardDescription>
          <Skeleton className="h-[20px] w-[300px] rounded-lg bg-foreground/10" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[92px] animate-pulse rounded-lg bg-foreground/10" />
      </CardContent>
    </Card>
  )
}

export const RadioSkeleton = () => {
  return <Skeleton className="h-[24px] w-full rounded-lg bg-foreground/10" />
}

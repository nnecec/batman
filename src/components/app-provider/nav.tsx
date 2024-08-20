import { Link, Outlet } from 'react-router-dom'

type NavLink = {
  title: string
  to: string
}

type NavProps = {
  title: string
  items: NavLink[]
}
export function Nav({ title, items }: NavProps) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">{title}</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav className="grid gap-4 text-sm text-muted-foreground">
            {items.map(item => (
              <Link key={item.title} className="font-semibold text-primary" to={item.to}>
                {item.title}
              </Link>
            ))}
          </nav>
          <div className="">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  )
}
